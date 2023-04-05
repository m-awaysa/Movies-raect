import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
function MovieCard({ vote_average, poster_path, name, width = '', id, type, classes = '', list_id = null, setRefresh = null, refresh = null }) {

    const sessionId = cookie.load('session_id');
    const api_key = '352f716e969ef97191556e88ef26f893';
    const accountId = '18338550';

    const addToWatchList = async () => {
        const movieWatchList = await axios
            .post(`https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${api_key}&session_id=${sessionId}`, {
                media_type: type,
                media_id: id,
                watchlist: true

            });
        const message = movieWatchList.data.status_message;
        if (message === 'The item/record was updated successfully.' || message === 'Success.') {
            toast.success('Added to your watchlist')
        }
    }

    const addToFavorite = async () => {
        const movieFavorite = await axios
            .post(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${api_key}&session_id=${sessionId}`,
                {
                    media_type: type,
                    media_id: id,
                    favorite: true
                }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const message = movieFavorite.data.status_message;
        if (message === 'The item/record was updated successfully.' || message === 'Success.') {
            toast.success('Added to your favorite')
        }
    }

    const deleteFromList = async () => {
        try {

            const { data } = await axios.post(`https://api.themoviedb.org/3/list/${list_id}/remove_item?api_key=${api_key}&session_id=${sessionId}`, {
                media_id: id
            })
            if (data.status_message === "The item/record was deleted successfully.") {
                toast.success('deleted');
            } else {
                toast.success('failed');
            }
            setRefresh(!refresh)
        } catch (error) {
            setRefresh(!refresh)
            toast.error('error');
        }

    }

    return (
        <>

            <div className="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3"  >
                {list_id ? <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                    onClick={deleteFromList}
                    className="bi bi-trash-fill position-absolute p-1 bg-danger border-warning m-1 rounded m-2 " viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg> :
                    (type !== 'person' && sessionId) ? <div className='position-absolute card-icons'>
                        <svg onClick={addToWatchList} xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                            className="text-light m-1  bi bi-stopwatch-fill " viewBox="0 0 16 16">
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
                        </svg>
                        <svg onClick={addToFavorite} xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                            className="bi bi-heart-fill text-danger m-1" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </div> : ''}

                <Link className="movie_card" to={`/${type}/${id}`}>
                    <div className="movie_card__cover">

                        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/img/section/movie.jpg"} alt=""
                            className={`${width}`} style={{ maxHeight: '280px' }} />

                        <a href="#" className="movie_card__play">
                            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                        </a>
                    </div>
                    <div className="movie_card__content">
                        <h3 className="movie_card__title mb-0"><a href="#" className={classes}>{name}</a></h3>

                        <span className="movie_card__rate text-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg> &nbsp;
                            {vote_average}
                        </span>
                    </div>
                </Link>
            </div>



        </>
    )
}

export default MovieCard