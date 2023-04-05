import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
function AddToListCard({ vote_average, poster_path, name, width = '', id, type, classes = '', buttonName = 'Add', list_id, setRefresh = null, refresh = null }) {

    const sessionId = cookie.load('session_id');
    const api_key = '352f716e969ef97191556e88ef26f893';
    const addToList = async () => {
        try {

            const { data } = axios.post(`https://api.themoviedb.org/3/list/${list_id}/add_item?api_key=${api_key}&session_id=${sessionId}`, {
                media_id: id
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success('success')
            setRefresh(!refresh)
            console.log(data)
        } catch (error) {
            setRefresh(!refresh)
            toast.success('success')
        }
    }
    return (
        <>

            <div className="col-6 col-sm-4 col-lg-3 col-xl-2 my-3"  >
                <Link className="movie_card" to={`/${type}/${id}`}>
                    <div className="movie_card__cover">

                        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/img/section/movie.jpg"} alt=""
                            className={`${width}`} style={{ maxHeight: '280px' }} />

                        <div className="movie_card__play">
                            <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            </svg>
                        </div>
                    </div>
                    <div className="movie_card__content">
                        <h3 className="movie_card__title mb-0"><span className={classes}>{name}</span></h3>

                    </div>
                </Link>

                <span className="movie_card__rate text-warning mb-3 w-100">
                    {(sessionId) ? <button onClick={addToList} className='w-100 btn btn-primary' style={{ zIndex: 24 }}>
                        {buttonName}
                    </button> : ''}
                </span>
            </div>



        </>
    )
}

export default AddToListCard