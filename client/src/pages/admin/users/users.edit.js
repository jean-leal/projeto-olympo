import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuAdmin from '../../../components/menu-admin';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

const mdTheme = createTheme();

export default function UserRegister() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  const { idUser } = useParams();

  useEffect(() => {
    async function getUser() {
      var response = await api.get('/api/users.details/' + idUser);

      setName(response.data.user_name);
      setLogin(response.data.user_login);
      setPassword(response.data.user_password);
      setType(response.data.user_type);

    }
    getUser()
  }
    , [])


  async function handleSubmit() {
    const data = {
      user_name: name,
      user_login: login,
      user_password: password,
      user_type: type,
      _id: idUser
    }

    if (name !== '' && login !== '' && password !== '' && type !== '') {
      const response = await api.put('/api/users', data);

      if (response.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Erro de atualização de usuário!');
      }
    } else {
      alert('Preencha todos os dados!');
    }

  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'USUÁRIOS'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper sx={{ p: 2 }}>
                  <h2>Atualização de Usuários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome Completo"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="login"
                        name="login"
                        label="Login Usuário"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="label-type">Tipo Usuário</InputLabel>
                        <Select
                          labelId="label-type"
                          id="type"
                          label="type"
                          value={type}
                          onChange={e => setType(e.target.value)}
                        >
                          <MenuItem value={1}>Administrador</MenuItem>
                          <MenuItem value={2}>Usuário Padrão</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="password"
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        fullWidth
                        autoComplete="senha"
                        size="small"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button onClick={handleSubmit} variant="contained">Salvar</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
