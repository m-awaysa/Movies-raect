import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import RatingCard from '../common/RatingCard';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';

const TMDBRatedEpisode = ({ currentLngCode,t }) => {
    const [totalPages, setTotalPages] = useState(20);
    const [page, setPage] = useState(1);
    const [episodes, setEpisodes] = useState([]);
    const sessionId = cookie.load('session_id');
    const accountId = '18338550';//irrelevant
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    const getMovies = async () => {
      try {
        const ratedTvShows = await axios
          .get(`https://api.themoviedb.org/3/account/${accountId}/rated/tv/episodes`, {
            params: {
              api_key: '352f716e969ef97191556e88ef26f893',
              language: currentLngCode,
              sort_by: 'created_at.asc',
              page: page,
              session_id:sessionId
            }
          });
        setEpisodes(ratedTvShows.data.results);
        setTotalPages(ratedTvShows.data.total_pages)
        setTimeout(() => {
          setLoading(false)
        }, 500);
      } catch (e) {
        setEpisodes([]);
        setTotalPages(0)
        setTimeout(() => {
          setLoading(false)
        }, 200);
      }
    }
    const deleteRating = async (showId, season_number, episode_number) => {
  
      await axios.delete(`https://api.themoviedb.org/3/tv/${showId}/season/${season_number}/episode/${episode_number}/rating`, {
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
    }, [page, currentLngCode, refresh]);
  
  
  
    return <>
       {loading? <Loader/>:episodes.length !== 0 ?
        <div className="catalog">
          <div className="container">
            <div className="row">
              {episodes.map((episode, index) =>
                <RatingCard
                  deleteRating={deleteRating}
                  showId={episode.show_id}
                  season_number={episode.season_number}
                  episode_number={episode.episode_number}
                  key={index}
                  type="episode"
                  id={episode.id}
                  poster_path={episode.still_path}
                  name={episode.name}
                  vote_average={episode.vote_average} />)}
            </div>
          </div>
        </div> :
        <h4 className='text-center text-danger'>{t('no_rated_episodes')}</h4>}
      <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} />


    </>
  };
  
export default TMDBRatedEpisode;
