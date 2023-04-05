import React, { useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';

function EpisodeCard({ season_number, id, vote_average, poster_path, name, ep_number = 1, release_date, runtime, vote_count, overview, t, currentLngCode = 'en', backdrop_path }) {

    const [rating, setRating] = useState(1);
    const api_key = '352f716e969ef97191556e88ef26f893';
    const guest_session_id = cookie.load('guest_session_id')
    const sessionId = cookie.load('session_id')


    const rateTheMove = async () => {
        try {
            const { data } = await axios
                .post(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${ep_number}/rating?api_key=${api_key}&guest_session_id=${guest_session_id}`,
                    {
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
                .post(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${ep_number}/rating?api_key=${api_key}&session_id=${sessionId}`, {
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
                                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/img/section/movie.jpg"} alt />
                            </div>
                        </div>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                            <div className="movie_card__content">
                                <div className="movie_card__wrap">
                                    <span className="movie_card__rate text-warning"><i className="icon ion-ios-star" />{vote_average}</span>
                                    <ul className="movie_card__list">
                                        <li>HD</li>
                                        <li className='episode_vote_Count mx-1'>{vote_count}</li>
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
                                        :guest_session_id ? <li className='mx-1'>
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
                                <ul className="movie_card__meta">
                                    <li><span>{t('name')}:</span>{name}</li>
                                    <li><span>{t('episode_number')}:</span>{ep_number}</li>
                                    <li><span>{t('release_year')}:</span> {release_date}</li>
                                    <li><span>{t('running_time')}:</span> {runtime} {t('min')}</li>
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

export default EpisodeCard