import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import RatingCard from '../common/RatingCard';
import Loader from '../Loader/Loader';


const RatedMovies = ({ currentLngCode ,t}) => {
  const [totalPages, setTotalPages] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const guest_session_id = cookie.load('guest_session_id');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);


  const getMovies = async () => {
    try {

      const ratedMovies = await axios

        .get(`https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            language: currentLngCode,
            sort_by: 'created_at.asc',
            page: page
          }
        });
      setMovies(ratedMovies.data.results);
      setTotalPages(ratedMovies.data.total_pages)
      setTimeout(() => {
        setLoading(false)
      }, 500);
    } catch (e) {
      setMovies([]);
      setTotalPages(0)
    }
  }
  const deleteRating = async (id) => {
    await axios.delete(`https://api.themoviedb.org/3/movie/${id}/rating`, {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        api_key: '352f716e969ef97191556e88ef26f893',
        guest_session_id: guest_session_id,
      }
    },)
    setRefresh(!refresh);
  }

  useEffect(() => {
    getMovies(page)
  }, [page, currentLngCode, refresh]);



  return <>
    { loading ? <Loader/>: movies.length !== 0 ?
      <div className="catalog">
        <div className="container">
          <div className="row">
            {movies.map((movie, index) =>
              <RatingCard
                deleteRating={deleteRating}
                key={index}
                type="movie"
                id={movie.id}
                poster_path={movie.poster_path}
                name={movie.title}
                vote_average={movie.rating} />)}
          </div>
        </div>
      </div> :
      <h4 className='text-center text-danger'>{t('no_rated_movies')}</h4>}
  </>
};

export default RatedMovies;