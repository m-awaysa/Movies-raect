import React, { useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';

function ShowSingleCard({ id, type, vote_average, poster_path, adult, genres = [], release_date, runtime, countries = [], overview, t, currentLngCode }) {

    const [rating, setRating] = useState(1);
    const api_key = '352f716e969ef97191556e88ef26f893';
    const guest_session_id = cookie.load('guest_session_id')
    const sessionId = cookie.load('session_id');
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
    const rateTheMove = async () => {
        try {
            const { data } = await axios
                .post(`https://api.themoviedb.org/3/${type}/${id}/rating?api_key=${api_key}&guest_session_id=${guest_session_id}`, {
                    value: rating
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (data.success) {
                toast.success('rated successfully');
            } else {
                toast.error('failed, please try again later');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const rateTheMoveTMDB = async () => {
        try {
            const { data } = await axios
                .post(`https://api.themoviedb.org/3/${type}/${id}/rating?api_key=${api_key}&session_id=${sessionId}`, {
                    value: rating
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (data.success) {
                toast.success('rated successfully');
            } else {
                toast.error('failed, please try again later');
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const log = (value) => {
        setRating(value)
    }

    const expandText = () => {
        if (overview) {
            document.querySelector('.movie_card__description--details').classList.toggle('movie_card__description_read')
        }
    }
    return (
        <>
            <div className="col-12 col-xl-6" dir={currentLngCode === 'ar' ? 'rtl' : 'ltr'}>
                <div className="movie_card movie_card--details">
                    <div className="row">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                            <div className="movie_card__cover">
                                {(type !== 'person' && sessionId) ? <div className='position-absolute card-icons'>
                                    <svg onClick={addToWatchList} xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                                        className="text-light m-1  bi bi-stopwatch-fill p-1  bg-dark" viewBox="0 0 16 16">
                                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
                                    </svg>
                                    <svg onClick={addToFavorite} xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                                        className="bi bi-heart-fill text-danger m-1 bg-dark p-1" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                </div> : ''}
                                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/img/section/movie.jpg"} alt />
                            </div>
                        </div>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                            <div className="movie_card__content">
                                <div className="movie_card__wrap">
                                    <span className="movie_card__rate"><i className="icon ion-ios-star" />{vote_average}</span>
                                    <ul className="movie_card__list">
                                        <li>HD</li>

                                        {sessionId ? <li className='mx-1'>
                                            <svg
                                                data-bs-toggle="collapse" href="#multiCollapseExample1"
                                                role="button" aria-expanded="false" aria-controls="multiCollapseExample1"
                                                xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                                className="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                            <div className="collapse multi-collapse mt-2" id="multiCollapseExample1">
                                                <button onClick={rateTheMoveTMDB} className='btn btn-sm btn-dark border-warning text-light rounded-0 '>Rate : {rating} </button>
                                                <div className="mt-2 " style={{ width: 150 }}>
                                                    <Slider step={0.5} onChange={log} min={1} max={10} />
                                                </div>
                                            </div>
                                        </li>
                                            : guest_session_id ? <li className='mx-1'>
                                                <svg
                                                    data-bs-toggle="collapse" href="#multiCollapseExample1"
                                                    role="button" aria-expanded="false" aria-controls="multiCollapseExample1"
                                                    xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                                    className="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <div className="collapse multi-collapse mt-2" id="multiCollapseExample1">
                                                    <button onClick={rateTheMove} className='btn btn-sm btn-dark border-warning text-light rounded-0 '>Rate : {rating} </button>
                                                    <div className="mt-2 " style={{ width: 150 }}>
                                                        <Slider step={0.5} onChange={log} min={1} max={10} />
                                                    </div>
                                                </div>
                                            </li> : ''}
                                    </ul>
                                </div>
                                <div></div>
                                <ul className="movie_card__meta">
                                    <li><span>{t('genre')}:</span>
                                        {genres.map((genre,index) => (<a key={index} href="#">{genre.name}</a>))}
                                    </li>
                                    <li><span>{t('release_year')}:</span> {release_date}</li>
                                    <li><span>{t('running_time')}:</span> {runtime} {t('min')}</li>
                                    <li><span>{t('country')}:</span>
                                        {countries.map((country,index) => (<a key={index} href="#">{country.iso_3166_1}</a>))}
                                    </li>
                                    <li><span>{t('overview')}:</span>
                                        <div className={` movie_card__description movie_card__description_read movie_card__description--details `
                                            + (overview !== '') ? 'movie_card__description--details' : ''}>
                                            {overview ? overview : t('no_overview')}
                                        </div>
                                    </li>
                                </ul>

                                <div onClick={expandText} className='b-description_readmore_button ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowSingleCard