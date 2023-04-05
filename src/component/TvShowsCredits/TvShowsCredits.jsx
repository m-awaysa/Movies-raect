import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import MovieCard from '../common/SImpleCard';
import Loader from '../Loader/Loader';



const TvShowsCredits = ({ currentLngCode = 'en' }) => {
  const { id } = useParams();
  const [tvShows, setTvShowa] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getTvShows = async () => {
    try {

      const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?language=${currentLngCode}`, {
        params: {
          api_key: '352f716e969ef97191556e88ef26f893',
          append_to_response: 'videos'
        }
      })
      setTvShowa(data.cast.slice(0, 12));
      setTimeout(() => {
        setLoading(false)
      }, 300);
    } catch (e) {
      setTvShowa([]);
      setTimeout(() => {
        setLoading(false)
      }, 300);
    }
  }

  useEffect(() => {
    getTvShows()

  }, []);


  return <>
   {loading? <Loader classes='bg-dark'/>:tvShows.length > 0 ?
      <div className="catalog">
        <div className="container">
          <div className="row ">
            {tvShows.map((tvShow,index) => <MovieCard key={index} type="tv" id={tvShow.id} poster_path={tvShow.poster_path} name={tvShow.name} vote_average={tvShow.vote_average} classes='text-dark' />)}
          </div>
        </div>
      </div>
      : <h4 className='text-center text-danger'>No tvShows found</h4>}
  </>
};


export default TvShowsCredits;