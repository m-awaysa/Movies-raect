import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import MovieCard from '../common/SImpleCard';
import Filter from '../Filter/Filter'
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import "./Movies.css";
import Loader from '../Loader/Loader';

const Movies = ({ currentLngCode, t }) => {

  const [totalPages, setTotalPages] = useState(100);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState([2000, 2023]);
  const [rating, setRating] = useState([0, 10]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const getMovies = async () => {
    try {
      const { data } = await axios
        .get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=${releaseDate[1]}&primary_release_date.gte=${releaseDate[0]}`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            language: cookie.load('i18next'),
            with_genres: genre,
            page: page,
            "vote_average.gte": rating[0],
            "vote_average.lte": rating[1]
          }
        });
      setMovies(data.results);
      setTotalPages(data.total_pages)
      setTimeout(() => {
        setLoading(false)
      }, 100);

    } catch (e) {
      setMovies([]);
      setTotalPages(0)
      setTimeout(() => {
        setLoading(false)
      }, 200);
    }

  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  useEffect(() => {
    getMovies(page)
  }, [page, filterTrigger, currentLngCode, genre]);

  return (
    <>
      <PageTitle title={t('movies')} startPoint={t('home')} />
      <Filter
        currentLngCode={currentLngCode}
        translate={t}
        setDateRange={setReleaseDate}
        setGenre={setGenre}
        setRatingRange={setRating}
        dateRange={releaseDate}
        ratingRange={rating}
        setFilterTrigger={setFilterTrigger}
        filterTrigger={filterTrigger}
      />
      {loading ? <Loader classes='my-3' /> : (<><div className="catalog">
        <div className="container">
          <div className="row">
            {movies.map((movie, index) =>
              <MovieCard type="movie" id={movie.id} key={index} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} />
            )}
          </div>
        </div>
      </div>
        <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} /></>)}
    </>
  )
}

export default Movies