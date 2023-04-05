import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import WatchListCard from '../common/WatchListCard';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';


const TvWatchList = ({ currentLngCode,t }) => {

  const [totalPages, setTotalPages] = useState(20);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const sessionId = cookie.load('session_id');
  const accountId = '18338550';//this is variable is irrelevant and doesn't affect the api
  const api_key = '352f716e969ef97191556e88ef26f893';
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  


  const getMovies = async () => {
    try {
      const movieWatchList = await axios
        .get(`https://api.themoviedb.org/3/account/${accountId}/watchlist/tv`, {
          params: {
            api_key: '352f716e969ef97191556e88ef26f893',
            language: currentLngCode,
            sort_by: 'created_at.asc',
            page: page,
            session_id: sessionId
          }
        });
      setMovies(movieWatchList.data.results);
      setTotalPages(movieWatchList.data.total_pages)
      setTimeout(() => {
        setLoading(false)
      }, 200);
    } catch (e) {
      setMovies([]);
      setTotalPages(0)
      setTimeout(() => {
        setLoading(false)
      }, 200);
    }
  }

  const deleteFromWatchList = async (id) => {
    const movieWatchList = await axios
      .post(`https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${api_key}&session_id=${sessionId}`, {
        media_type: 'tv',
        media_id: id,
        watchlist: false

      });
    const message = movieWatchList.data.status_message;
    if (message === 'The item/record was deleted successfully.' || message === 'Success.') {
      toast.success('Deleted successfully')
      setRefresh(!refresh);
    }
  }
  useEffect(() => {
    getMovies(page)
  }, [page, currentLngCode, refresh]);


  return <>
    {loading? <Loader/>:movies.length !== 0 ?
      <div className="catalog">
        <div className="container">
          <div className="row">
            {movies.map((tv, index) =>
              <WatchListCard
                deleteFromWatchList={deleteFromWatchList}
                key={index}
                type="tv"
                id={tv.id}
                poster_path={tv.poster_path}
                name={tv.title}
                vote_average={tv.vote_average} />)}
          </div>
        </div>
      </div> :
      <h4 className='text-center text-danger'>{t('watchlist_empty')}</h4>
    }



    <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} />
  </>
};

export default TvWatchList;