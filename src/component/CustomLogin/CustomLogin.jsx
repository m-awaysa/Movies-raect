import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Joi from 'joi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import cookie from 'react-cookies'

const CustomLogin = ({ setUserToken, setGuestSessionId }) => {
  const [loginBtn, setLoginBtn] = useState(false);
  const { t } = useTranslation();
  const apiKey = '352f716e969ef97191556e88ef26f893';
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  let getUserData = (e) => {
    let myUser = user;
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  let submitFormData = async (e) => {
    e.preventDefault();
    setLoginBtn(true);
    let resultValidation = validationRegisterUser(user);
    if (resultValidation.error) {
      setLoginBtn(false);
      setErrorList(resultValidation.error.details);
    } else {
      setErrorList([]);
      try {
        let { data } = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin", user);
        if (data.message === 'success') {

          const expires = new Date();
          const futureDate = expires.getDate() + 1;
          expires.setDate(futureDate)
          cookie.save(
            'userToken',
            data.token, {
            expires,
          }
          )

          setUserToken(data.token);
          navigate('/');
          await createGuestSession()
        }
      } catch (error) {

        let err = [];
        if (error.response.data.messgae) {
          err.push({ message: error.response.data.messgae });
          toast.error(error.response.data.messgae);
        } else {
          toast.error(error.response.data.message);
          err.push(error.response.data);
        }
        setLoginBtn(false);
        setErrorList(err)
      }
    }
  }

  const createGuestSession = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`);

    setGuestSessionId(data.guest_session_id);
    const expires = new Date();
    const futureDate = expires.getDate() + 1;
    expires.setDate(futureDate)
    cookie.save(
      'guest_session_id',
      data.guest_session_id,
      {
        expires,
      })
  }

  let validationRegisterUser = (user) => {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return <>
    <form onSubmit={submitFormData} className="sign__form">
      <Link className="sign__logo">
        <img style={{ display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: '#2b2b31', transition: 'background-color 300ms' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Movies%21_logo.svg/128px-Movies%21_logo.svg.png" />
      </Link>
      <ul className='login-text pb-3'>
        <li className='pb-2 login_sentence'>login with custom account gives access to:</li>
        <li>* Add/Delete Rating</li>
      </ul>
      {errorList.map((error, index) => <div key={index} className='alert alert-warning border-danger w-100'>{error.message}</div>)}
      <div className="sign__group">
        <input onChange={getUserData} type="email" name="email" className="sign__input" placeholder={t('email')} />
      </div>
      <div className="sign__group">
        <input onChange={getUserData} type="password" name="password" className="sign__input" placeholder={t('password')} />
      </div>
      {loginBtn ?
        <div className="sign__btn border-0">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-arrow-clockwise re-reload" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </div>
        : <button className="sign__btn border-0" type="submit" >{t('sign_in')}</button>}
      <span className="sign__text">{t('dont_have_an_account')} <Link to="/register">{t('sign_up')}</Link></span>
    </form>
  </>
};

export default CustomLogin;