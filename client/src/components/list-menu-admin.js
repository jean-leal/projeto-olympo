import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { getToken, logout } from '../services/auth';
import api from '../services/api';
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component="a" href="/admin" >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton> 
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset> Opções </ListSubheader>
    <ListItemButton onClick={exitConf}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);

async function exitConf(){
  if(window.confirm('Deseja realmente sair do sistema?')){
    const response = await api.get('/api/users/destroyToken', {headers:{token: getToken()}});
    if(response.status===200){
      logout();
      window.location.href = '/'
    }else{
      alert('Não foi possivel fazer o logout!')
    }
  }
}