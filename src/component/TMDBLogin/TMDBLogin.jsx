import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Joi from 'joi';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import cookie from 'react-cookies'

const TMDBLpgin = ({  setSessionId,currentLngCode }) => {
  const [loginBtn, setLoginBtn] = useState(false);
  const { t } = useTranslation();
  const apiKey = '352f716e969ef97191556e88ef26f893';
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    username: '',
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
        try {
          const request_token = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
            params: {
              api_key: apiKey
            }
          });

          if (request_token.data.success === true) {
            const validatedRequestedToken = await validateRequestedToken(request_token.data.request_token)
            const sessionId = await getSessionId(validatedRequestedToken);
            setSessionId(sessionId);
            const expires = new Date()
            expires.setDate(Date.now() + (60 * 60 * 24))
            cookie.save(
              'session_id',
              sessionId,
              {
                expires,
              })
          }
          setLoginBtn(false);
          navigate('/');
        } catch (error) {
          setLoginBtn(false);
          setErrorList([{message:"credential error"}])
        } 
  }


  const validateRequestedToken = async (requestToken) => {
    try {
      const validateRequestedToken = await axios
        .post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, {
          username: user.username,
          password: user.password,
          request_token: requestToken
        });
      return validateRequestedToken.data.request_token;
    } catch (error) {
    }
  }


  const getSessionId = async (validatedRequestedToken) => {
    const session = await axios.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
      params: {
        request_token: validatedRequestedToken
      }
    });
    return session.data.session_id
  }

  return <>
    <form onSubmit={submitFormData} className="sign__form">
      <Link className="sign__logo">
        <img style={{ display: 'block', WebkitUserSelect: 'none', margin: 'auto', backgroundColor: '#2b2b31', transition: 'background-color 300ms' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Movies%21_logo.svg/128px-Movies%21_logo.svg.png" />
      </Link>
      <ul className='login-text pb-3'>
        <li className='pb-2 login_sentence'>login with TMDB account gives access to:</li>
        <li>* Create/Edit watchlist(watch later)</li>
        <li>* Create/Edit favorite list</li>
        <li>* Create/Edit your own movie categories</li>
        <li>* Add/Delete Rating</li>
        <li>* username: moviesGuest</li>
        <li>* password: guest1234</li>
      </ul>
      {errorList.map((error, index) => <div key={index} className='alert alert-warning border-danger w-100'>{error.message}</div>)}
      <div className="sign__group">
        <input onChange={getUserData} type="text" name="username" className="sign__input" placeholder={t('username')} />
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
      <span className="sign__text" dir={currentLngCode ==='ar'?'rtl':'ltr'}>{t('dont_have_a_TMDB_account')} <Link to="https://www.themoviedb.org/signup">{t('sign_up')}</Link></span>
      <span className="sign__text "><Link to="https://www.themoviedb.org/reset-password">{t('forgot_pass')}</Link></span>
    </form>
  </>
};

export default TMDBLpgin;