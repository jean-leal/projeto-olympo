import React,{useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuAdmin from '../../../components/menu-admin';
import Copyright from '../../../components/copyright-admin';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function UserRegister() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  async function handleSubmit(){
    const data = {
      user_name : name,
      user_login : login,
      user_password : password,
      user_type : type}
    
      const response = await api.post('/', data);
      console.log(response)
      if (response.status === 200){
        alert('deu certo o cadastro de usuário')
      }else{
        alert('erro de cadastro de usuário')
      }
      return Promise.reject(response);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <MenuAdmin title = {'USUÁRIOS'} />
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>    
                <Grid item sm={12}>
                  <Paper sx={{ p: 2 }}>
                    <h2>Cadastro de Usuários</h2>
                    <Grid container spacing={3}> 
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          id="name"
                          name="name"
                          label="Nome Completo"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          value={name}
                          onChange={e => setName (e.target.value)}
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
                          variant="standard"
                          value={login}
                          onChange={e => setLogin (e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="label-type">Tipo Usuário</InputLabel>
                        <Select
                          labelId="label-type"
                          id="type"
                          label="type"
                          value={type}
                          onChange={e => setType (e.target.value)}
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
                          variant="standard"
                          value={password}
                          onChange={e => setPassword (e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button onClick={handleSubmit} variant="contained">Salvar</Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>     
                 
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
    </ThemeProvider>
  );
}