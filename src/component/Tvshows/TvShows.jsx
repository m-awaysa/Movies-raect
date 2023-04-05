import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import MovieCard from '../common/SImpleCard';
import Filter from '../Filter/Filter'
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import Loader from '../Loader/Loader';

function TvShows({ currentLngCode, t }) {
  const [totalPages, setTotalPages] = useState(100);
  const [page, setPage] = useState(1);
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState([2000, 2023]);
  const [rating, setRating] = useState([0, 10]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const { data } = await axios
      .get(`https://api.themoviedb.org/3/discover/tv?api_key=352f716e969ef97191556e88ef26f893&language=${cookie.load('i18next')}&with_genres=${genre}&release_date.lte=${releaseDate[1]}&release_date.gte=${releaseDate[0]}&page=${page}&vote_average.gte=${rating[0]}&vote_average.lte=${rating[1]}`);//&with_genres=${genre}&vote_average.gte=8.5&page=${page}&release_date.lte=${releaseDate[1]}
    setTvShows(data.results);
    setTotalPages(data.total_pages)
    setTimeout(() => {
      setLoading(false)
    }, 100);
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    getMovies(page)
  }, [page, filterTrigger, currentLngCode, genre]);


  return (
    <>
      <PageTitle title={t('tvshows')} startPoint={t('home')} />
      <Filter
        translate={t}
        setDateRange={setReleaseDate}
        setGenre={setGenre}
        setRatingRange={setRating}
        dateRange={releaseDate}
        ratingRange={rating}
        setFilterTrigger={setFilterTrigger}
        filterTrigger={filterTrigger}
      />
      {loading ? <Loader classes='my-3' /> : <> (      <div className="catalog">
        <div className="container">
          <div className="row">
            {tvShows.map((tvShow, index) =>
              <>

                <MovieCard type="tv" key={index} id={tvShow.id} vote_average={tvShow.vote_average} name={tvShow.name} poster_path={tvShow.poster_path} />
              </>
            )}
          </div>
        </div>
      </div>

        <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} />)</>}
    </>
  )
}

export default TvShows