import React, { useEffect, useState } from 'react';
import api from './api';
import {loginUser, logout, getToken } from './auth';
import {Route, Navigate} from 'react-router-dom';

export default function WAuth ({component: Component, ...rest}){
    const [navigate, setRedirect] = useState(false);
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
        loading?'Carregando...':<Route{...rest}
        render={props => !navigate?(
            <Component {... props}/>
        ):<Navigate to={{pathname:"/admin/login", state:{from: props.location}}}/>
    }/>
    )
}