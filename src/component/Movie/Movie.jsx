import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShowSingleCard from '../common/ShowSingleCard';
import YouTube from 'react-youtube';
import BreakBar from '../common/BreakBar';
import { useTranslation } from "react-i18next";
import MovieCard from '../common/SImpleCard';

const Movie = ({ currentLngCode = 'en' }) => {

  const { t } = useTranslation();
  let navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [movieTrailer, setMovieTrailer] = useState();
  const [recommendation, setRecommendation] = useState([]);

  const getMovie = async () => {
    try {
      if (currentLngCode === 'en') {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=${currentLngCode}`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            append_to_response: 'videos'
          }
        })

        setMovie(result.data);
        if (result.data.videos.results.length !== 0) {
          const trailer = result.data.videos.results.find(vid => vid.type === 'Trailer');

          const key = ((trailer) ? trailer.key : result.data.videos.results[0].key)

          setMovieTrailer(key)
        } else {
          setMovieTrailer('notfound')
        }

      } else {
        const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=${currentLngCode}`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
          }
        })
        setMovie(result.data);
        const videos = await axios.get(` https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
          }
        })
        if (videos.data.results.length !== 0) {
          const trailer = videos.data.results.find(vid => vid.type === 'Trailer');
          const key = ((trailer) ? trailer.key : result.data.videos.results[0].key)
          setMovieTrailer(key)
        } else {
          setMovieTrailer('notfound')
        }
      }
    } catch (error) {
      navigate('/NotFound')
    }
  }

  const getRecommendation = async () => {
    try {
      const { data } = await axios.get(` https://api.themoviedb.org/3/movie/${id}/recommendations?language=${currentLngCode}`, {
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
    getMovie()
    getRecommendation();
  }, [currentLngCode, t, id]);

  return <>
    <section className="section details ">

      <div className="details__bg" data-bg="img/home/home__bg.jpg" />

      <div className="container">
        <div className="row" dir={currentLngCode === 'ar' ? 'rtl' : 'ltr'}>

          <div className="col-12">
            <h1 className="details__title">{movie.title}</h1>
          </div>

          <ShowSingleCard
            type='movie'
            currentLngCode={currentLngCode}
            t={t}
            id={movie.id}
            vote_average={movie.vote_average} poster_path={movie.poster_path} adult={movie.adult}
            genres={movie.genres} release_date={movie.release_date}
            runtime={movie.runtime} countries={movie.production_countries} overview={movie.overview}
          />

          <div className="col-12 col-xl-6">
            <YouTube videoId={movieTrailer}
              onError={() => setMovieTrailer('U7UnGlaYB5o')}
              opts={{
                width: '100%',
                height: '400px'
              }}
            />
          </div>

        </div>
      </div>
    </section>

    <BreakBar translate={t} title={t('recommendations')} />
    {recommendation.length !== 0 ? <div className="catalog">
      <div className="container">
        <div className="row">
          {recommendation.map((movie,index) => <MovieCard key={index} type="movie" id={movie.id} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} />)}
        </div>
      </div>
    </div> :
      <h4 className='text-center m-5 text-danger'>{t('no_recommendation')}</h4>}

    {/* <BreakBar translate={t} title={t('rating')} /> */}


  </>
};

export default Movie;