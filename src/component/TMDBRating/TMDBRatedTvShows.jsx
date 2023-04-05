import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import RatingCard from '../common/RatingCard';
import Loader from '../Loader/Loader';


const TMDBRatedTvShows = ({ currentLngCode,t }) => {
    const [totalPages, setTotalPages] = useState(20);
    const [page, setPage] = useState(1);
    const [tvShows, setTvShows] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const sessionId = cookie.load('session_id');
    const accountId = '18338550';
    const [loading, setLoading] = useState(true);

    const getMovies = async () => {
      try {
        const ratedTvShows = await axios
        .get(`https://api.themoviedb.org/3/account/${accountId}/rated/tv`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            language: currentLngCode,
            sort_by: 'created_at.asc',
            page: page,
            session_id:sessionId

          }
        });
        setTvShows(ratedTvShows.data.results);
        setTotalPages(ratedTvShows.data.total_pages)
        setTimeout(() => {
          setLoading(false)
        }, 500);
      } catch (e) {
        setTvShows([]);
        setTotalPages(0)
        setTimeout(() => {
          setLoading(false)
        }, 200);
      }
    }
  
    const deleteRating = async (id) => {
      await axios.delete(`https://api.themoviedb.org/3/tv/${id}/rating`, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
          session_id: sessionId,
        }
      },)
      setRefresh(!refresh);
    }
  
    useEffect(() => {
      getMovies(page)
    }, [page, currentLngCode,refresh]);
  
  
  
    return <>
       {loading? <Loader/>:tvShows.length !== 0 ?
        <div className="catalog">
          <div className="container">
            <div className="row">
              {tvShows.map((tvShow, index) =>
                <RatingCard
                  deleteRating={deleteRating}
                  key={index}
                  type="tv"
                  id={tvShow.id}
                  poster_path={tvShow.poster_path}
                  name={tvShow.name}
                  vote_average={tvShow.rating} />)}
            </div>
          </div>
        </div> :
        <h4 className='text-center text-danger'>{t('no_rated_tvShows')}</h4>}
      <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} />

    </>
  };
  
export default TMDBRatedTvShows;
