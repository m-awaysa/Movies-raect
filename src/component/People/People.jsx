import axios from 'axios';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import BreakBar from '../common/BreakBar';
import PersonCard from '../common/SImpleCard';
import Loader from '../Loader/Loader';
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import './People.css'

function People({ currentLngCode, t }) {
  const [totalPages, setTotalPages] = useState(50);
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);


  const getPeople = async () => {
    try {
      const { data } = await axios
        .get(`https://api.themoviedb.org/3/person/popular?api_key=352f716e969ef97191556e88ef26f893&language=${t('languageCode')}&page=${page}`);
      setPeople(data.results);

      setTotalPages(data.total_pages)
      setTimeout(() => {
        setLoading(false)
      }, 100);
    } catch (e) {
      setPeople([]);
      setTotalPages(0)
      setTimeout(() => {
        setLoading(false)
      }, 100);
    }

  }
  useLayoutEffect(() => {
    window.scrollTo(0, 10)
  });
  useEffect(() => {
    getPeople(page)
  }, [page, currentLngCode]);

  return (
    <>
      <PageTitle title={t('people')} startPoint={t('home')} currentLngCode={currentLngCode} />
      <BreakBar translate={t} title={t('people')} classes='break_bar_no_border pb-2 pt-1 mb-5' />

      {loading ? <Loader classes='my-3' /> : <>  (      <div className="catalog">
        <div className="container">
          <div className="row">
            {people.map((movie, index) => <PersonCard key={index} type="person" id={movie.id} poster_path={movie.profile_path} name={movie.name} vote_average={movie.popularity} />)}
          </div>
        </div>
      </div>

        <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} maxPages={50} />)</>}
    </>
  )
}

export default People