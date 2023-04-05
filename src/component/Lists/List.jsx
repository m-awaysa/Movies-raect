import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import MovieCard from '../common/SImpleCard';
import { useParams } from 'react-router-dom';
import AddToListCard from '../common/AddToListCard';

const List = ({ currentLngCode, t }) => {
    const { id } = useParams();
    const [totalPages, setTotalPages] = useState(100);
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const api_key = '352f716e969ef97191556e88ef26f893'
    const [refresh, setRefresh] = useState(true);
    const [show, setShow] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [listName, setListName] = useState('');
    const onChange = (event) => {
        setSearchData(event.target.value)
    }

    const search = async () => {
        try {
            setSearchLoading(true)
            const { data } = await axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchData}`);
            console.log(data)
            setSearchResult(data.results);
            setTimeout(() => {
                setSearchLoading(false)
                setShow(true)
            }, 100);

        } catch (e) {
            setMovies([]);
            setTotalPages(0)
            setTimeout(() => {
                setSearchLoading(false)
                setShow(true)
            }, 100);
        }
    }

    const getMovies = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/list/${id}?api_key=${api_key}`);

            console.log(data)
            setMovies(data.items);
            setTotalPages(data.total_pages)
            setListName(data.name)
            setTimeout(() => {
                setLoading(false)
            }, 100);

        } catch (e) {
            setMovies([]);
            setTotalPages(0)
            setTimeout(() => {
                setLoading(false)
            }, 200);
        }

    }

    useEffect(() => {
        getMovies(page)
        console.log(show)
    }, [page, currentLngCode, refresh, show]);

    return (
        <>
            <PageTitle title={listName} startPoint={t('home')} />
            {loading ? <Loader classes='my-3' /> : (<>
                <div className='position-relative container my-2'>
                    <div>
                        <button onClick={search} type='button'
                            className=' btn text-warning btn-dark border-secondary btn-sm rounded-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor"
                                className="bi bi-search mb-1 me-1" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                        <input onChange={onChange} placeholder={t('search_movies_to_add')} className='btn text-start text-dark bg-light btn-sm rounded-0' style={{ cursor: 'text' }} type="text" />
                    </div>
                </div>
                {searchLoading ? <Loader /> : show ? (<div className="catalog mt-5">
                    <div className="container border">
                        <button onClick={() => setShow(false)} className='btn btn-secondary m-2 ms-0' style={{ zIndex: 15 }}>{t('close_search_box')}</button>
                        <div className="row">
                            {searchResult.length > 0 ? searchResult.map((movie, index) =>
                                <AddToListCard
                                    list_id={id}
                                    type="movie"
                                    id={movie.id}
                                    key={index}
                                    poster_path={movie.poster_path}
                                    name={movie.title}
                                    vote_average={movie.vote_average}
                                    buttonName={t('add_to_list')}
                                    setRefresh={setRefresh}
                                    refresh={refresh}/>
                            ) : <h4 className='text-center text-danger'>{t('not_found')}</h4>}
                        </div>
                    </div>
                </div>) : <></>}


                <div className="catalog mt-3">
                    <div className="container">
                        <div className="row">
                            {movies.length > 0 ? movies.map((movie, index) =>
                                <MovieCard
                                    list_id={id}
                                    type="movie"
                                    id={movie.id}
                                    key={index}
                                    poster_path={movie.poster_path}
                                    name={movie.title}
                                    vote_average={movie.vote_average}
                                    setRefresh={setRefresh}
                                    refresh={refresh}
                                />
                            ) : <h4 className='text-center text-danger'>{t('list_empty')}</h4>}
                        </div>
                    </div>
                </div>
                <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} /></>)}
        </>
    )
}

export default List;
