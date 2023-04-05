import React, { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import HomeHeader from '../HomeHeader/HomeHeader';
import "react-multi-carousel/lib/styles.css";
import axios from 'axios';
import BreakBar from '../common/BreakBar';
import CarouselSection from '../common/CarouselSection';
import './Home.css'

function Home({ translate }) {

  const [pathName, setPathName] = useState(window.location.pathname);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTvShows, setTopRatedTvShows] = useState([]);
  const [topRatedPeople, setTopRatedPeople] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const changeToMovie = () => {
    setPathName('/')
  }

  const changeToTv = () => {
    setPathName('/TrendingTvShows')
  }

  const changeToPeople = () => {
    setPathName('/TrendingPeople')
  }

  const getTopRated = async () => {
    const movies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=352f716e969ef97191556e88ef26f893&language=${translate('languageCode')}`);
    setTopRatedMovies(movies.data.results.slice(0, 8))

    const tvs = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=352f716e969ef97191556e88ef26f893&language=${translate('languageCode')}`);
    setTopRatedTvShows(tvs.data.results.slice(0, 8))

    const people = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=352f716e969ef97191556e88ef26f893&language=${translate('languageCode')}`);
    setTopRatedPeople(people.data.results.slice(0, 8))


  }
  useEffect(() => {
    getTopRated()

  }, [translate]);
  return (
    <>
      <HomeHeader />
      <div className='home_background'>
        <div>
          <section className="content ">
            <div className="content__head">
              <div className="container">
                <div className="row">
                  <div className="col-12 navbar-expand-sm">

                    <div className='d-flex flex-column'>
                      <h2 className={`content__title ` + translate('ms_me_auto')}>{translate('trending')}</h2>
                      <button className={`navbar-toggler pb-2 ` + translate('ms_me_auto')} type="button"
                        data-bs-toggle="collapse" data-bs-target="#trendingContent" aria-controls="trendingContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-toggles">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                            className="bi bi-toggles text-warning" viewBox="0 0 16 16">
                            <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
                          </svg>
                        </i>
                      </button>
                    </div>


                    <div className={`collapse navbar-collapse ` + translate('flex_end_or_start')} id="trendingContent">
                      <ul className={`navbar-nav content__tabs ` + translate('flex_end_or_start')} id="content__tabs" role="tablist">
                        <li onClick={changeToMovie} className="nav-item">
                          <Link className={"nav-link " + ((pathName === '/') ? "active text-danger p-1" : " ")} to="/">{translate('movies')}</Link>
                        </li>
                        <li onClick={changeToTv} className="nav-item">
                          <Link className={"nav-link " + ((pathName === '/TrendingTvShows') ? "active text-danger p-1" : " ")} to="/TrendingTvShows" >{translate('tvshows')}</Link>
                        </li>
                        <li onClick={changeToPeople} className="nav-item">
                          <Link className={"nav-link " + ((pathName === '/TrendingPeople') ? "active text-danger p-1" : " ")} to="/TrendingPeople" >{translate('people')}</Link>
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



        <BreakBar translate={translate} title={translate('topRatedMovies')} />
        <CarouselSection type='movie' responsive={responsive} items={topRatedMovies} name='title' poster_path='poster_path' />

        <BreakBar translate={translate} title={translate('topRatedTvShows')} />
        <CarouselSection type='tv' responsive={responsive} items={topRatedTvShows} name='name' poster_path='poster_path' />

        <BreakBar translate={translate} title={translate('topRatedPeople')} />
        <CarouselSection type='person' responsive={responsive} items={topRatedPeople} name='name' poster_path='profile_path' />

      </div>



    </>
  )
}

export default Home