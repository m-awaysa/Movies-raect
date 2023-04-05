import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import MovieCard from '../common/SImpleCard';
import Loader from '../Loader/Loader';


const MoviesCredits = ({currentLngCode='en'}) => {
  const {id} = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getMovies = async () => {
    try {

      const {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=${currentLngCode}`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
          append_to_response: 'videos'
        }
      })
       setMovies(data.cast.slice(0,12));
       setTimeout(() => {
        setLoading(false)
      }, 300);
    } catch (e) {
      setMovies([]);
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
  }

  useEffect(() => {
    getMovies()

  }, []);


  return <>
  {loading? <Loader classes='bg-dark'/>:movies.length > 0?
    <div className="catalog">
      <div className="container">
        <div className="row ">
          {movies.map((movie,index) => <MovieCard key={index} type="movie" id={movie.id} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} classes='text-dark' />)}
        </div>
      </div>
    </div>
    : <h4 className='text-center text-danger'>No movies found</h4>}
  </>
};



export default MoviesCredits;