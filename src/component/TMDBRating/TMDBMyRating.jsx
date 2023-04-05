import React, { useEffect, useState, useLayoutEffect } from 'react'
import PageTitle from '../PageTitle/PageTitle'
import { Link,Outlet } from 'react-router-dom'
import styles from './Rating.css';

const TMDBMyRating = ({ currentLngCode, t }) => {

  
    const [pathName, setPathName] = useState('/Rating');
  
  
  
    const changeToMovie = () => {
      setPathName(`/Rating`)
    }
  
    const changeToTv = () => {
      setPathName(`/TvShows`)
    }
    const changeToTvEpisode = () => {
      setPathName(`/TvEpisode`)
    }
  
    return <>
      <PageTitle title={t('myRating')} startPoint={t('home')} />
  
      <div>
        <section className="content ">
          <div className="content__head">
            <div className="container">
              <div className="row">
                <div className="col-12 navbar-expand-sm">
  
                  <div className='d-flex flex-column'>
                    <h2 className={`content__title ` + t('ms_me_auto')}>{t('rating')}</h2>
                    <button className={`navbar-toggler pb-2 ` + t('ms_me_auto')} type="button" data-bs-toggle="collapse" data-bs-target="#watchListContent"
                      aria-controls="watchListContent" aria-expanded="false" aria-label="Toggle navigation">
                      <i className="bi bi-toggles">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                          className="bi bi-toggles text-warning" viewBox="0 0 16 16">
                          <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
                        </svg>
                      </i>
                    </button>
                  </div>
  
                  <div className={`collapse navbar-collapse ` + t('flex_end_or_start')} id="watchListContent">
                    <ul className={`navbar-nav content__tabs ` + t('flex_end_or_start')} id="content__tabs" role="tablist">
                      <li onClick={changeToMovie} className="nav-item">
                        <Link className={"nav-link " + ((pathName === '/Rating') ? "active text-danger" : " ")} to="">{t('movies')}</Link>
                      </li>
                      <li onClick={changeToTv} className="nav-item">
                        <Link className={"nav-link " + ((pathName === '/TvShows') ? "active text-danger" : " ")} to="TvShows" >{t('tvshows')}</Link>
                      </li>
                      <li onClick={changeToTvEpisode} className="nav-item">
                        <Link className={"nav-link " + ((pathName === '/TvEpisode') ? "active text-danger" : " ")} to="TvEpisode" >{t('episodes')}</Link>
                      </li>
                    </ul>
                  </div>
  
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </section>
      </div>
    </>
  };
export default TMDBMyRating;
