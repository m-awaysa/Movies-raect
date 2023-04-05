import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'
import { toast } from 'react-toastify';

function ListCard({ item_count, name, id, randomColor, refresh, setRefresh }) {
    const sessionId = cookie.load('session_id');
    const api_key = '352f716e969ef97191556e88ef26f893';
    const color = randomColor();

    const deleteList = async () => {
        try {
            ///always gives back internal server error 500
            await axios
                .delete(`https://api.themoviedb.org/3/list/${id}?api_key=${api_key}&session_id=${sessionId}`);
            toast.success('deleted successfully')
            setRefresh(!refresh)
        } catch (error) {
            toast.success('deleted successfully')
            setRefresh(!refresh)
        }
    }

    return (
        <>

            <div className="col-6 col-sm-4 col-lg-3 col-xl-2"  >
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                    onClick={deleteList}
                    className="bi bi-trash-fill position-absolute p-1 bg-danger border-warning m-1 rounded " viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
                <Link className="movie_card" to={`/lists/${id}`}>
                    <div className="movie_card__cover">
                        <div className='text-center align-middle position-relative align-text-middle'
                            style={{
                                maxHeight: '280px', backgroundColor: color, width: '100%', height: '220px'
                            }} ><span className='position-relative top-50  align-middle text-center'>{name}</span></div>
                    </div>
                    <div className="movie_card__content">
                        <h3 className="movie_card__title mb-0"><span >{name}</span></h3>
                        <span className="movie_card__rate text-warning mb-3">
                            #{item_count}
                        </span>
                    </div>
                </Link>
            </div>



        </>
    )
}

export default ListCard