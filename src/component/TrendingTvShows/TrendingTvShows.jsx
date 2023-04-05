import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../common/SImpleCard';
import Loader from '../Loader/Loader';


const TrendingTvShows = () => {


  const [tvShows, setTvShowa] = useState([]);
  const [loading, setLoading] = useState(true);


  const getTvShows = async () => {
    try {
      const { data } = await axios
        .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=352f716e969ef97191556e88ef26f893`);
      setTvShowa(data.results.slice(0, 12));
      ; setTimeout(() => {
        setLoading(false)
      }, 200);
    } catch (e) {
      setTvShowa([]);
      setTimeout(() => {
        setLoading(false)
      }, 100);
    }
  }

  useEffect(() => {
    getTvShows()

  }, []);


  return <>
    {loading ? <Loader /> : (<div className="catalog">
      <div className="container">
        <div className="row">
          {tvShows.map((tvShow, index) => <MovieCard key={index} type="tv" id={tvShow.id} poster_path={tvShow.poster_path} name={tvShow.name} vote_average={tvShow.vote_average} />)}
        </div>
      </div>
    </div>)}
  </>
};

export default TrendingTvShows;