import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import   '../Login/Login.css';
import CustomInput from '../common/CustomInput';

function Register({t}) {
  let navigate = useNavigate();
  const [serverError, setServerError] = useState([]);
  let [errorList, setErrorList] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });
  let [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const registerSchema = Joi.object({
    name: Joi.string().max(20).min(2).required(),
    age: Joi.number().min(20).max(80).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(16).required(), //pattern(/^[A-Z][a-z]{3,8}$/).
    cPassword: Joi.string().required().min(3).max(16)//.valid(Joi.ref('password')).messages({
    // 'any.only': 'password not match',
    //  }),
  });
  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name))
    if (validation.error) {
      setErrorList({ ...errorList, [name]: validation.error.details[0].message })
    } else {
      const err = { ...errorList }
      delete err[name];
      setErrorList({ ...err })
    }
    setInput({ ...input, [name]: value })
  };

  useEffect(() => {


  }, [input]);

  const submitRegister = async (e) => {
    e.preventDefault();

    if (Object.keys(errorList).length === 0) {
      try {
        let { data } = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup", input);

        if (data.message === 'success') {
          navigate('/login');
          toast.success('Registered successfully please confirm your email');
        }
      } catch (error) {
        let err = [];
        if(error.response.data.messgae){
          err.push({message:error.response.data.messgae});
          toast.error(error.response.data.messgae);
        }else{
          toast.error(error.response.data.message);
          err.push(error.response.data);
        }
        setServerError(err)
      }
    } else {

    }
  }

  return (
    <>
      <div className="sign section--bg" data-bg="/img/section/section.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sign__content">
                {/* authorization form */}
                <form onSubmit={submitRegister} className="sign__form">
                <Link to="#" className="sign__logo">
                    <img style={{ display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: '#2b2b31', transition: 'background-color 300ms' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Movies%21_logo.svg/128px-Movies%21_logo.svg.png" />
                  </Link>
                  {serverError.map((error, index) => <div key={index} className='alert alert-warning  border-danger w-100'>Error:{error.message}</div>)}
                  <CustomInput error={errorList.name} type="text" placeholder={t("name")} onChange={onChange} name="name" />
                  <CustomInput error={errorList.email} type="email" placeholder={t("email")} onChange={onChange} name="email" />
                  <CustomInput error={errorList.password} type="password" placeholder={t("password")} onChange={onChange} name="password" />
                  <CustomInput error={errorList.cPassword} type="password" placeholder={t("cPassword")} onChange={onChange} name="cPassword" />

                  <button className="sign__btn" type="submit">{t('sign_up')}</button>
                  <span className="sign__text">{t('have_an_account')}<Link to="/login">{t('sign_in')}</Link></span>
                </form>
                {/* end authorization form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register