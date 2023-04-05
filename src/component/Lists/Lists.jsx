import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PageTitle from '../PageTitle/PageTitle'
import Paginator from '../Paginator/Paginator';
import cookie from 'react-cookies'
import Loader from '../Loader/Loader';
import Modal from '../common/Modal';
import ListCard from '../common/ListCard';
import randomColor from 'randomcolor';

const Lists = ({ currentLngCode, t }) => {

    const [totalPages, setTotalPages] = useState(100);
    const [page, setPage] = useState(1);
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const sessionId = cookie.load('session_id');
    const accountId = '18338550';//irrelevant
    const api_key = '352f716e969ef97191556e88ef26f893'
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(true);

    const getLists = async () => {
        try {
            const { data } = await axios
                .get(`https://api.themoviedb.org/3/account/${accountId}/lists?`, {
                    params: {
                        api_key: api_key,
                        language: currentLngCode,
                        page: page,
                        session_id: sessionId,
                    }
                });
            console.log(data)
            setLists(data.results);
            setTotalPages(data.total_pages)

            setTimeout(() => {
                setLoading(false)
            }, 100);

        } catch (e) {
            setLists([]);
            setTotalPages(0)
            setTimeout(() => {
                setLoading(false)
            }, 200);
        }

    }
    useEffect(() => {
        getLists(page)
    }, [page, currentLngCode, refresh]);

    return (
        <>
            <PageTitle title={t('lists')} startPoint={t('home')} />
            <div className='position-relative container'>
                <button onClick={() => setShow(true)} type='button'
                    className='position-relative top-0 mt-2 btn text-warning btn-dark border-secondary btn-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor"
                        className="bi bi-plus-square-fill m-1 ms-0 text-warning rounded" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>
                    {t('create_list')}</button>
            </div>
            <Modal show={show} setShow={setShow} setRefresh={setRefresh} refresh={refresh} />
            {loading ? <Loader classes='my-3' /> : (<>
                <div className="catalog mt-3">
                    <div className="container">
                        <div className="row">
                            {lists.length > 0 ? lists.map((list, index) =>
                                <ListCard
                                    randomColor={randomColor}
                                    id={list.id}
                                    key={index}
                                    name={list.name}
                                    item_count={list.item_count}
                                    setRefresh={setRefresh}
                                    refresh={refresh} />
                            ) : <h4 className='text-center text-danger'>{t('watchlist_empty')}</h4>}
                        </div>
                    </div>
                </div>
                <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} /></>)}
        </>
    )
}

export default Lists;
