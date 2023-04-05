import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Login.css'

function Login({t}) {
  const [pathName, setPathName] = useState(window.location.pathname);

  const changeToCustomLogin = () => {
    setPathName('/login')
  }

  const changeToTMDBLogin = () => {
    setPathName('/login/tmdb')
  }
  return (
    <>
      <div className="sign section--bg" data-bg="/img/section/section.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sign__content">
                <ul className='login-list'>
                  <li onClick={changeToCustomLogin} className={"nav-item text-center " + ((pathName === '/login') ? "shine" : "not-shine")}>
                    <Link className="nav-link w-100 " to="/login">{t('customAccount')}</Link>
                  </li>
                  <li onClick={changeToTMDBLogin}  className={"nav-item text-center " + ((pathName === '/login/tmdb') ? "shine" : "not-shine")}>
                    <Link  className="nav-link w-100 "  to="tmdb" >{t('TMDBAccount')}</Link>
                  </li>
                </ul>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Login