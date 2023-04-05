import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Footer from './component/Footer/Footer'
import Home from './component/Home/Home'
import Movies from './component/Movies/Movies'
import TvShows from './component/Tvshows/TvShows'
import People from './component/People/People'
import About from './component/About/About'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import NotFound from './component/NotFound/NotFound'
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";
import TrendingTvShows from './component/TrendingTvShows/TrendingTvShows'
import TrendingMovies from './component/TrendingMovies/TrendingMovies'
import TrendingPeople from './component/TrendingPeople/TrendingPeople'
import Movie from './component/Movie/Movie'
import i18next from 'i18next'
import TvShow from './component/TvShow/TvShow'
import Season from './component/Season/Season'
import Person from './component/Person/Person'
import MoviesCredits from './component/MoviesCredits/MoviesCredits'
import TvShowsCredits from './component/TvShowsCredits/TvShowsCredits'
import axios from 'axios'
import MyWatchList from './component/MyWatchList/MyWatchList'
import MovieWatchList from './component/MovieWatchList/MovieWatchList'
import TvWatchList from './component/TvWatchList/TvWatchList'
import cookie from 'react-cookies'
import MyRating from './component/MyRating/MyRating'
import RatedMovies from './component/RatedMovies/RatedMovies'
import RatedTvShows from './component/RatedTvShows/RatedTvShows'
import RatedTvEpisode from './component/RatedTvEpisode/RatedTvEpisode'
import GuestSession from './component/ProtectedRoutes/GuestSession'
import SearchedItems from './component/SearchedItems/SearchedItems'
import CustomLogin from './component/CustomLogin/CustomLogin'
import TMDBLogin from './component/TMDBLogin/TMDBLogin'
import TMDBAccount from './component/ProtectedRoutes/TMDBAccount'
import Favorite from './component/Favorite/Favorite'
import FavoriteMovies from './component/Favorite/FavoriteMovies'
import FavoriteTvShows from './component/Favorite/FavoriteTvShows'
import TMDBMyRating from './component/TMDBRating/TMDBMyRating'
import TMDBRatedMovies from './component/TMDBRating/TMDBRatedMovies'
import TMDBRatedTvShows from './component/TMDBRating/TMDBRatedTvShows'
import TMDBRatedEpisode from './component/TMDBRating/TMDBRatedEpisode'
import Lists from './component/Lists/Lists'
import List from './component/Lists/List'
function App() {
  const [currentLngCode, setCurrentLngCode] = useState(cookie.load('i18next'));
  const { t } = useTranslation();
  const [userToken, setUserToken] = useState(cookie.load('userToken'));
  const [sessionId, setSessionId] = useState(cookie.load('session_id'));
  const [refresh, setRefresh] = useState(false);
  const [guestSessionId, setGuestSessionId] = useState(cookie.load('guest_session_id'));
  let navigate = useNavigate();


  const logout = async () => {
    try {
      await axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=352f716e969ef97191556e88ef26f893`, {
        data: {
          guest_session_id: guestSessionId
        }
      })
      setUserToken(null);
      setSessionId(null);
      setGuestSessionId(null);
      cookie.remove('userToken')
      cookie.remove('session_id')
      cookie.remove('guest_session_id')
      setRefresh(!refresh)
      navigate('/login')

    } catch (error) {
      //to make sure the data will be removed on logout
      setUserToken(null);
      setSessionId(null)
      setGuestSessionId(null);
      cookie.remove('userToken')
      cookie.remove('session_id')
      cookie.remove('guest_session_id')
      setRefresh(!refresh)
      navigate('/login')
    }
  }
  useEffect(() => {
    setCurrentLngCode(cookie.load('i18next'))
  }, [t, userToken, refresh]);

  return (
    <>
      <Navbar sessionId={sessionId} userToken={userToken} logout={logout} currentLngCode={currentLngCode} setCurrentLngCode={setCurrentLngCode} i18next={i18next} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes >
        <Route path='/' element={<Home translate={t} />}>
          <Route path='' element={<TrendingMovies />} />
          <Route path='/TrendingTvShows' element={<TrendingTvShows />} />
          <Route path='/TrendingPeople' element={<TrendingPeople />} />
        </Route>

        <Route path='people' element={<People currentLngCode={currentLngCode} t={t} />}></Route>
        <Route path='person/:id' element={<Person currentLngCode={currentLngCode} t={t} />}>
          <Route path='' element={<MoviesCredits />} />
          <Route path='TvShowsCredits' element={<TvShowsCredits />} />
        </Route>

        <Route path='tvShows' element={<TvShows currentLngCode={currentLngCode} t={t} />}></Route>
        <Route path='tv/:id' element={<TvShow currentLngCode={currentLngCode} t={t} />}></Route>
        <Route path='tv/:id/season/:season_number/episode/:episode_number' element={<Season currentLngCode={currentLngCode} t={t} />}></Route>

        <Route path='movies' element={<Movies currentLngCode={currentLngCode} t={t} />}></Route>
        <Route path='movie/:id' element={<Movie currentLngCode={currentLngCode} t={t} />}></Route>

        <Route element={<TMDBAccount />}>
          <Route path='watchList' element={<MyWatchList t={t} />}>
            <Route path='' element={<MovieWatchList currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='tvWatchList' element={<TvWatchList currentLngCode={currentLngCode} t={t} />}></Route>
          </Route>
          <Route path='Favorite' element={<Favorite t={t} />}>
            <Route path='' element={<FavoriteMovies currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='FavoriteTvShows' element={<FavoriteTvShows currentLngCode={currentLngCode} t={t} />}></Route>
          </Route>
          <Route path='Rating' element={<TMDBMyRating t={t} />}>
            <Route path='' element={<TMDBRatedMovies currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='TvShows' element={<TMDBRatedTvShows currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='TvEpisode' element={<TMDBRatedEpisode currentLngCode={currentLngCode} t={t} />}></Route>
          </Route>

          <Route path='lists' element={<Lists currentLngCode={currentLngCode} t={t} />}></Route>
          <Route path='lists/:id' element={<List currentLngCode={currentLngCode} t={t} />}></Route>
        </Route>

        <Route element={<GuestSession />}>
          <Route path='myRating' element={<MyRating t={t} />}>
            <Route path='' element={<RatedMovies currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='ratedTvShows' element={<RatedTvShows currentLngCode={currentLngCode} t={t} />}></Route>
            <Route path='ratedTvEpisode' element={<RatedTvEpisode currentLngCode={currentLngCode} t={t} />}></Route>
          </Route>
        </Route>

        <Route path='login' element={<Login t={t} />}>
          <Route path='' element={<CustomLogin setUserToken={setUserToken} setGuestSessionId={setGuestSessionId} />}></Route>
          <Route path='TMDB' element={<TMDBLogin setSessionId={setSessionId} currentLngCode={currentLngCode} />}></Route>
        </Route>


        <Route path='about' element={<About t={t} />}></Route>
        <Route path='register' element={<Register t={t} />}></Route>
        <Route path='/searchedItem/:search' element={<SearchedItems t={t} currentLngCode={currentLngCode} />}></Route>
        <Route path='/searchedItem' element={<SearchedItems t={t} currentLngCode={currentLngCode} />}></Route>

        <Route path='*' element={<NotFound />}></Route>

      </Routes>
      <Footer translate={t} />
    </>
  )
}

export default App