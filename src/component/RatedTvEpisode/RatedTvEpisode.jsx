import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import cookie from 'react-cookies'
import RatingCard from '../common/RatingCard';
import Loader from '../Loader/Loader';


const RatedTvEpisode = ({ currentLngCode,t }) => {
  const [totalPages, setTotalPages] = useState(20);
  const [page, setPage] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const guest_session_id = cookie.load('guest_session_id');
  const [refresh, setRefresh] = useState(false);

  const getMovies = async () => {
    try {
      const ratedTvShows = await axios
        .get(`https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/tv/episodes`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            language: currentLngCode,
            sort_by: 'created_at.asc',
            page: page
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
    }
  }
  const deleteRating = async (showId, season_number, episode_number) => {

    await axios.delete(`https://api.themoviedb.org/3/tv/${showId}/season/${season_number}/episode/${episode_number}/rating`, {
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
  </>
};

export default RatedTvEpisode;