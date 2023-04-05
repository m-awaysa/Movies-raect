import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useTranslation } from "react-i18next";

function Navbar({ logout, currentLngCode, setCurrentLngCode, i18next, userToken, sessionId }) {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb'
    },
    {
      code: 'ar',
      name: 'العربية',
      country_code: 'sa',
      dir: 'rlt'
    }
  ];
  const changeLng = (code) => {
    i18next.changeLanguage(code);
    setCurrentLngCode(code);
  }
  const toggleSearch = () => {
    document.querySelector('.header__search').classList.toggle('d-none')
    document.querySelector('.header__search').classList.toggle('header__search--active')

  }

  const onChange = (event) => {
    setSearch(event.target.value)

  }
  const searchData = async (event) => {
    event.preventDefault();
    navigate(`searchedItem/${search}`)
  }


  useEffect(() => {
    document.title = t('app_title')
  }, [t]);

  const GlobalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
    </svg>
  );



  return (
    <>
      <nav className="navbar navbar-expand-lg  shadow bg-dark bg-opacity-50">

        <div className="container-fluid container">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#c49b08" height="50" width="50" version="1.1" id="Layer_1" viewBox="-56.76 -56.76 323.75 323.75" xmlSpace="preserve" stroke="#c49b08" strokeWidth="5.255850000000001">
            <g id="SVGRepo_bgCarrier" strokeWidth={0}>
              <path transform="translate(-56.76, -56.76), scale(20.234375)" fill="#1a1b18" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth={0} />
            </g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M105.117,0C47.155,0,0,47.155,0,105.117c0,57.962,47.155,105.117,105.117,105.117s105.117-47.155,105.117-105.117 C210.234,47.155,163.079,0,105.117,0z M105.117,202.3c-53.589,0-97.183-43.596-97.183-97.183 c0-53.587,43.594-97.184,97.183-97.184S202.3,51.53,202.3,105.117C202.3,158.704,158.706,202.3,105.117,202.3z" /> <path d="M172.67,81.995c-1.154-0.724-2.607-0.8-3.839-0.205l-25.097,12.212v-2.739c0-10.953-8.894-19.862-19.829-19.862H55.529 C44.594,71.4,35.7,80.31,35.7,91.262v35.642c0,10.953,8.894,19.862,19.829,19.862h68.375c10.935,0,19.829-8.91,19.829-19.862 v-0.24l25.097,12.212c1.232,0.599,2.681,0.521,3.839-0.205c1.159-0.724,1.864-1.995,1.864-3.363V85.357 C174.533,83.989,173.828,82.719,172.67,81.995z M166.6,128.967l-25.098-12.212c-1.228-0.599-2.685-0.521-3.839,0.205 c-1.158,0.724-1.863,1.995-1.863,3.363v6.581c0,6.578-5.338,11.929-11.896,11.929H55.529c-6.558,0-11.896-5.352-11.896-11.929 V91.262c0-6.578,5.338-11.929,11.896-11.929h68.375c6.558,0,11.896,5.351,11.896,11.929v9.08c0,1.367,0.705,2.638,1.863,3.363 c1.154,0.724,2.615,0.804,3.839,0.205L166.6,91.698V128.967z" /> </g> </g> </g> </g>
          </svg>

          <div className="dropdown">
            <button className="btn btn-link text-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <GlobalIcon />
            </button>
            <ul className="dropdown-menu bg-secondary">
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button className="dropdown-item"
                    onClick={() => changeLng(code)}
                    disabled={code === currentLngCode}>
                    <span className={`fi fi-${country_code}`} style={{ opacity: code === currentLngCode ? 0.5 : 1 }}></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Link onClick={toggleSearch} className="nav-link text-warning mx-2 d-lg-none d-block" >
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Link>
          <button className="navbar-toggler  bg-secondary ms-auto" style={{ height: '100%' }} type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon  " />
          </button>



          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">{t('home')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="movies">{t('movies')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="TvShows">{t('tvshows')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="people">{t('people')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="about">{t('about')}</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Link onClick={toggleSearch} className="nav-link text-success mx-2 d-lg-block d-none" >
                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="currentColor"
                 className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Link>
              {userToken ?
                <>
                  <li className="nav-item ">
                    <Link className="nav-link text-success logout-nav" to="/myRating">
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                      </svg>
                      <div className='list-movie-hover  text-light' id='logout' style={currentLngCode === 'ar' ? { height: "20px" } : { height: "50px" }}>{t('myRating')}</div>

                    </Link>
                  </li>
                  <li onClick={logout} className="nav-item ">
                    <Link className="nav-link text-light logout-nav" >
                      <svg xmlns="http://www.w3.org/2000/svg" width={25} height={30} fill="currentColor" className="text-warning bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                      </svg>
                      <div className='list-movie-hover' id='logout' style={currentLngCode === 'ar' ? { height: "50px" } : { height: "20px" }}>{t('logout')}</div>

                    </Link>
                  </li>
                </>
                : sessionId ?
                  <>
                    <li className="nav-item ">
                      <Link className="nav-link text-warning logout-nav" to="/lists">
                        <svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                        <div className='list-movie-hover text-light' id='logout' style={{ height: "22px" }}>{t('lists')}</div>
                      </Link>
                    </li>

                    <li className="nav-item ">
                      <Link className="nav-link text-success logout-nav" to="/Rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                        <div className='list-movie-hover text-light' id='logout' style={currentLngCode === 'ar' ? { height: "20px" } : { height: "50px" }}>{t('myRating')}</div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light list-movie" to="/favorite">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor"
                          className="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                        <div className='list-movie-hover ' id='list'>{t('favorites')}</div>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light  watch-list-nav" to="/watchlist">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor"
                          className="text-success bi bi-stopwatch-fill" viewBox="0 0 16 16">
                          <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
                        </svg>
                        <div className='list-movie-hover ' id='watchlist' style={currentLngCode === 'ar' ? { height: "50px" } : { height: "20px" }}>{t('watchlist')}</div>
                      </Link>
                    </li>

                    <li onClick={logout} className="nav-item logout-nav">
                      <Link className="nav-link text-light logout-nav" >
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={30} fill="currentColor"
                          className="text-warning bi bi-box-arrow-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                        </svg>
                        <div className='list-movie-hover ' id='logout' style={currentLngCode === 'ar' ? { height: "50px" } : { height: "20px" }}>{t('logout')}</div>
                      </Link>
                    </li>


                  </>
                  : <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="login">{t('login')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="register">{t('sign_up')}</Link>
                    </li>
                  </>}


            </ul>

          </div>
        </div>

        <form onSubmit={searchData} action="#" className="header__search  d-none">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header__search-content">
                  <input onChange={onChange} value={search} type="text" placeholder="Search for a movie, TV Series or Person that you are looking for" />
                  <button className='search-button text-center' >search</button>
                </div>
              </div>
            </div>
          </div>
        </form>

      </nav >


    </>
  )
}

export default Navbar