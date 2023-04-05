import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import cookie from 'react-cookies'
const GuestSession = () => {

    if(!cookie.load('guest_session_id')){
        return <Navigate to='/login'/>
    }else{
        return <Outlet/>
    }
}

export default GuestSession;
