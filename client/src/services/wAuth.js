import React, { useEffect, useState } from 'react';
import api from './api';
import {loginUser, logout, getToken } from './auth';
import {Route, Navigate} from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function WAuth ({children, component: Component, ...rest}){
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/users/checktoken', {params : {token:getToken()}});

            if (res.data.status ===200){
                setLoading(false);
                setRedirect(false);
            }else{
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, [])

    return (
        loading?<Box sx={{ width: '50%' , margin:'80px auto'}}> <LinearProgress /> </Box>: !redirect? children :

            <Navigate to={{pathname: "/"}} />        
    )
}