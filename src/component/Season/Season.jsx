import './Season.css';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import BreakBar from '../common/BreakBar';
import EpisodesDisplay from '../common/EpisodesDisplay';
import EpisodeCard from '../common/EpisodeCard';
import PersonCard from '../common/SImpleCard';

const Season = ({ currentLngCode = 'en', t }) => {

  let navigate = useNavigate();
  const [tvShow, setTvShow] = useState('');
  const { id, season_number,episode_number } = useParams();
  const [season, setSeason] = useState({});
  const [TvTrailer, setTvTrailer] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState({});
  const [crew, setCrew] = useState([]);
  const [guestStars, setGuestStars] = useState([]);

  const selectEpisode = async (episodeId = null) => {
    if (episodeId) {
      const ep = episodes.find(ep => ep.id === episodeId)
      setSelectedEpisode(ep)
      setCrew(ep.crew.slice(0, 12))
      setGuestStars(ep.guest_stars.slice(0, 12))
    } else {
      setSelectedEpisode(episodes[0]);
      setCrew(episodes[0].crew.slice(0, 12));
      setGuestStars(episodes[0].guest_stars.slice(0, 12));
    }
    try {
      const episodeVideo = await axios
        .get(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${selectedEpisode.episode_number}/videos`,
          {
            params: {
              api_key: '352f716e969ef97191556e88ef26f893'
            }
          })
      if (episodeVideo.data.results.length !== 0) {
        const trailer = episodeVideo.data.results.find(vid => vid.type === 'Trailer');
        trailer = trailer ? trailer : episodeVideo.data.results.find(vid => vid.type === 'Clip');
        const key = ((trailer) ? trailer.key : episodeVideo.data.results[0].key)
        setTvTrailer(key)
      } else {
        setTvTrailer('notfound')
      }
    } catch (error) {

    }
  }

  const getTvShow = async () => {
    const tvShowData = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=en`, {
      params: {
        api_key: '352f716e969ef97191556e88ef26f893',
        append_to_response: 'videos'
      }
    })

    setTvShow(tvShowData.data.name);
    if (tvShowData.data.videos.results.length !== 0) {
      const trailer = tvShowData.data.videos.results.find(vid => vid.type === 'Trailer');
      const key = ((trailer) ? trailer.key : tvShowData.data.videos.results[0].key)
      setTvTrailer(key)
    } else {
      setTvTrailer('notfound')
    }
  }

  const getSeason = async () => {
    try {
      getTvShow();

      const result = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=${currentLngCode}`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893'
        }
      })
      setSeason(result.data);
      setEpisodes(result.data.episodes)
      setSelectedEpisode(result.data.episodes.find(ep => ep.episode_number === parseInt(episode_number)))
      setCrew(result.data.episodes[0].crew.slice(0, 12))
      setGuestStars(result.data.episodes[0].guest_stars.slice(0, 12));

    } catch (error) {
      navigate('/NotFound')
    }
  }


  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    getSeason()

  }, [currentLngCode, t, id,],);


  return (
    <>
      <section className="section details ">

        <div className="details__bg" data-bg="img/home/home__bg.jpg" />

        <div className="container">
          <div className="row" dir={currentLngCode === 'ar' ? 'rtl' : 'ltr'}>

            <div className="col-12">
              <h1 className="details__title text-center ">{tvShow}: {season.name}/{t('episode')} {selectedEpisode.episode_number}</h1>
            </div>

            <EpisodeCard
              id={id}
              season_number={season_number}
              currentLngCode={currentLngCode}
              t={t}
              backdrop_path={selectedEpisode.backdrop_path}
              ep_number={selectedEpisode.episode_number}
              vote_average={selectedEpisode.vote_average}
              poster_path={selectedEpisode.still_path}
              release_date={selectedEpisode.air_date}
              name={selectedEpisode.name}
              runtime={selectedEpisode.runtime}
              vote_count={selectedEpisode.vote_count}
              overview={selectedEpisode.overview}
            />
            <div className="col-12 col-xl-6">
              <YouTube videoId={TvTrailer}
                onError={() => setTvTrailer('U7UnGlaYB5o')}
                opts={{
                  width: '100%',
                  height: '400px'
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 container">
          <div className="accordion" id="accordion">
            {episodes.map((episode,index) => <EpisodesDisplay key={index} t={t} EpisodesDisplay={EpisodesDisplay} episode={episode} selectEpisode={selectEpisode} />)}
          </div>
        </div>

      </section>

      <BreakBar translate={t} title={t('crew')} />
      {crew.length !== 0 ? <div className="catalog">
        <div className="container">
          <div className="row">
            {crew.map((person,index) => <PersonCard key={index} type="person"
              id={person.id}
              poster_path={person.profile_path}
              name={person.name}
              vote_average={person.popularity} />)}
          </div>
        </div>
      </div> : <h4 className='text-center m-5 text-danger'>{t('no_recommendation')}</h4>}


      <BreakBar translate={t} title={t('guest_stars')} />
      {guestStars.length !== 0 ? <div className="catalog">
        <div className="container">
          <div className="row">
            {guestStars.map((person,index) => <PersonCard key={index} type="person"
              id={person.id}
              poster_path={person.profile_path}
              name={person.name}
              vote_average={person.popularity} />)}
          </div>
        </div>
      </div> : <h4 className='text-center m-5 text-danger'>{t('no_recommendation')}</h4>}
    </>
  )
};

export default Season;