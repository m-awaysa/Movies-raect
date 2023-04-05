import axios from 'axios';
import React, { useState } from 'react';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';

const Modal = ({ show = false, setShow, setRefresh, refresh }) => {
    const sessionId = cookie.load('session_id');
    const [data, setData] = useState({
        name: "",
        description: '',
        language: 'en'
    });
    const onChange = (event) => {
        console.log(event.target.name)
        setData({ ...data, [event.target.name]: event.target.value })

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post(`https://api.themoviedb.org/3/list?api_key=352f716e969ef97191556e88ef26f893&session_id=${sessionId}`, data);
            if (result.data.status_message === "The item/record was created successfully.") {
                toast.success('created successfully')
                setShow(false)
            }
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
            toast.error('failed,please try later')
            setShow(false)
            setRefresh(!refresh)
        }
    }
    return (
        <>
            {show ? <div className="modal-container">
                <div className="create-modal container">
                    <svg onClick={() => setShow(false)} xmlns="http://www.w3.org/2000/svg" width={17} height={17} fill="currentColor"
                        className="bi bi-x-octagon-fill m-2 position-absolute end-0 text-warning"
                        viewBox="0 0 16 16" style={{ cursor: "pointer" }}>
                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                    </svg>

                    <form onSubmit={onSubmit} className='flex-column d-flex container'>
                        <h4 className='text-center mt-3'>Create List</h4>
                        <input onChange={onChange} name='name' type="text" className='p-1 m-2 ' placeholder='List Name' />
                        <input onChange={onChange} name='description' type="text" className='p-1  m-2' placeholder='Description' />
                        <button className='p-1 m-2  border-warning text-dark'>Create</button>
                    </form>
                </div>
            </div> : <></>}
        </>
    );
}

export default Modal;
