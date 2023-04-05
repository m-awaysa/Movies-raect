import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieCard from '../common/SImpleCard';
import Loader from '../Loader/Loader';

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  const getMovies = async () => {
    try {
      const { data } = await axios
        .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=352f716e969ef97191556e88ef26f893`);
      setMovies(data.results.slice(0, 12));
      setTimeout(() => {
        setLoading(false)
      }, 100);
    } catch (e) {
      setMovies([]);
      setTimeout(() => {
        setLoading(false)
      }, 100);
    }
  }

  useEffect(() => {
    getMovies()

  }, []);


  return <>
    {loading ? <Loader /> : (<div className="catalog">
      <div className="container">
        <div className="row">
          {movies.map((movie, index) => <MovieCard key={index} type="movie" id={movie.id} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} />)}
        </div>
      </div>
    </div>)}
  </>
};

export default TrendingMovies;