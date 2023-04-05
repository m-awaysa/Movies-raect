import  './TvShow.css';
import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RowCard from '../common/RowCard';
import ShowSingleCard from '../common/ShowSingleCard';
import YouTube from 'react-youtube';
import BreakBar from '../common/BreakBar';

import TvShowCard from '../common/SImpleCard';
import SeasonsDisplay from '../common/SeasonsDisplay';


const TvShow = ({ currentLngCode = 'en', t }) => {

  let navigate = useNavigate();
  const { id } = useParams();
  const [TvShow, setTvShow] = useState({});
  const [TvTrailer, setTvTrailer] = useState();
  const [recommendation, setRecommendation] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const getTv = async () => {
    try {
      if (currentLngCode === 'en') {

        const result = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=${currentLngCode}`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            append_to_response: 'videos'
          }
        })
        setTvShow(result.data);
        setSeasons(result.data.seasons)
     
        if (result.data.videos.results) {
          const trailer = result.data.videos.results.find(vid => vid.type === 'Trailer');
          const key = ((trailer) ? trailer.key : result.data.videos.results[0].key)
          setTvTrailer(key)
        } else {
          setTvTrailer('notfound')
        }

      } else {
        const result = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=${currentLngCode}`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
          }
        })
        
        setTvShow(result.data);
        setSeasons(result.data.seasons)

        const videos = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
          }
        })
       
        if (videos.data.results) {
          const trailer = videos.data.results.find(vid => vid.type === 'Trailer');
          const key = ((trailer) ? trailer.key : result.data.videos.results[0].key)
          setTvTrailer(key)
        } else {
          setTvTrailer('notfound')
        }
      }
    } catch (error) {
      navigate('/NotFound')
    }
  }

  const getRecommendation = async () => {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=${currentLngCode}`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
        }
      })
      setRecommendation(data.results)
    } catch (error) {
      setRecommendation([])
    }
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  useEffect(() => {
    getTv()
    getRecommendation();

  }, [currentLngCode, t, id]);

  return <>
    <section className="section details ">

      <div className="details__bg" data-bg="img/home/home__bg.jpg" />

      <div className="container">
        <div className="row"  dir={currentLngCode==='ar'?'rtl':'ltr'}>

          <div className="col-12">
            <h1 className="details__title">{TvShow.name}</h1>
          </div>

          <ShowSingleCard
            type='tv'
            currentLngCode={currentLngCode}
            t={t}
            id={TvShow.id}
            vote_average={TvShow.vote_average} poster_path={TvShow.poster_path} adult={TvShow.adult}
            genres={TvShow.genres} release_date={TvShow.first_air_date}
            runtime={TvShow.episode_run_time} countries={TvShow.production_countries} overview={TvShow.overview}
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
          {seasons.map((season,index) => <SeasonsDisplay key={index} currentLngCode={currentLngCode} t={t} season={season} id={TvShow.id} />)}
        </div>
      </div>

    </section>

    <BreakBar translate={t} title={t('recommendations')} />
    {recommendation.length !== 0 ?  <div className="catalog">
      <div className="container">
        <div className="row">
          {recommendation.map((TvShow,index) => <TvShowCard key={index} type="tv" id={TvShow.id} poster_path={TvShow.poster_path} name={TvShow.title} vote_average={TvShow.vote_average} />)}
        </div>
      </div>
    </div>:
      <h4 className='text-center m-5 text-danger'>{t('no_recommendation')}</h4>}

    {/* <BreakBar translate={t} title={t('rating')} /> */}
  </>
};


export default TvShow;