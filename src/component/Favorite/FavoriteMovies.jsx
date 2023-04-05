import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
import FavoriteCard from '../common/FavoriteCard';
import Loader from '../Loader/Loader';

const FavoriteMovies = ({ currentLngCode,t }) => {

    const [totalPages, setTotalPages] = useState(20);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const sessionId = cookie.load('session_id');
    const accountId = '18338550';//this variable is irrelevant and it doesn't affect the api
    const api_key = '352f716e969ef97191556e88ef26f893';
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

  
  
  
    const deleteFromFavorite = async (id) => {
      const favoriteMovies = await axios
        .post(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${api_key}&session_id=${sessionId}`, {
          media_type: 'movie',
          media_id: id,
          favorite: false
  
        });
      const message = favoriteMovies.data.status_message;
      if (message === 'The item/record was deleted successfully.' || message === 'Success.') {
        toast.success('Deleted successfully')
        setRefresh(!refresh);
      }
    }

    useEffect(() => {
      
    const getMovies = async () => {
      try {
  
        const favoriteMovies = await axios
          .get(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies`, {
            params: {
              api_key: '352f716e969ef97191556e88ef26f893',
              language: currentLngCode,
              sort_by: 'created_at.asc',
              page: page,
              session_id: sessionId
            }
          });
        setMovies(favoriteMovies.data.results);
        setTotalPages(favoriteMovies.data.total_pages)
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
      getMovies(page);
    }, [page, currentLngCode, refresh]);
  
  
    return <>
       {loading? <Loader/>:movies.length !== 0 ?
        <div className="catalog">
          <div className="container">
            <div className="row">
              {movies.map((movie, index) => <FavoriteCard deleteFromFavorite={deleteFromFavorite} key={index} type="movie" id={movie.id} poster_path={movie.poster_path} name={movie.title} vote_average={movie.vote_average} />)}
            </div>
          </div>
        </div> :
        <h4 className='text-center text-danger'>{t('watchlist_empty')}</h4>
      }
  
  
  
      <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} />
    </>
  };
export default FavoriteMovies;
