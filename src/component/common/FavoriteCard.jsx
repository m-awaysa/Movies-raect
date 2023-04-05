import React from 'react';
import { Link } from 'react-router-dom'

const FavoriteCard = ({deleteFromFavorite, vote_average, poster_path, name, width = '', id, type, classes = '' }) => {

    return (
        <>

            <div className="col-6 col-sm-4 col-lg-3 col-xl-2"  >
                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor"
                 onClick={()=>deleteFromFavorite(id)}
                 className="bi bi-trash-fill position-absolute p-1 bg-danger border-warning m-1 rounded " viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>

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

                        <span className="movie_card__rate text-warning mb-3">
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

export default FavoriteCard;
