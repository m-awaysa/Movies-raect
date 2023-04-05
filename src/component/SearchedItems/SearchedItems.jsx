import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import MovieCard from '../common/SImpleCard';
import Filter from '../Filter/Filter'
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';


const SearchedItems = ({ currentLngCode, t }) => {
  const [movies, setMovies] = useState([]);
  const { search } = useParams();
  const api_key = '352f716e969ef97191556e88ef26f893'
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  const searchData = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=${currentLngCode}&page=1&include_adult=false&query=${search}`);
    setMovies(data.results)
    setTimeout(() => {
      setLoading(false)
    }, 1200);
  }

  useEffect(() => {
    searchData()

    return () => {
      setMovies([])
    };
  }, [currentLngCode, search,loading]);

  useEffect(() => {
    setLoading(true)
  }, [search]);



  return (
    <>
      <PageTitle title={t('search')} startPoint={t('home')} />

      <div className="catalog mt-3">
        {loading ? <Loader classes='mt-3' /> : (<div className="container">
          <div className="row">

            {(movies.length > 0) ?
              movies.map((movie, index) => {
                if (movie.media_type === 'movie') {
                  return <MovieCard key={index} type="movie" id={movie.id} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} />
                } else if (movie.media_type === 'tv') {
                  return <MovieCard key={index} type="tv" id={movie.id} poster_path={movie.poster_path} name={movie.name} vote_average={movie.vote_average} />

                } else {
                  return <MovieCard key={index} type="person" id={movie.id} poster_path={movie.profile_path} name={movie.name} vote_average={movie.popularity} />
                }
              }
              ) : <h4 className='text-danger text-center'>No result found</h4>}
          </div>
        </div>)}
      </div>
    </>
  )
}
export default SearchedItems;