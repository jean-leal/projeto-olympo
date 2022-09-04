import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuAdmin from '../../../components/menu-admin';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function SectorsRegister() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit() {
    const data = {
      sector_code: code,
      sector_name: name
    }

    if (code !== '' && name !== '') {
      const response = await api.post('/api/sectors', data);

      if (response.status === 200) {
        window.location.href = '/admin/sectors'
      } else {
        alert('erro de cadastro de setor');
      }
    } else {
      alert('Preencha todos os dados!');
    }

  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={'SETORES'} />
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
                  <h2>Cadastro de Setores</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="code"
                        name="code"
                        label="Código"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button onClick={handleSubmit} variant="contained">Salvar</Button>
                      <Button variant="contained" color="error" href="/admin/sectors">Cancelar</Button>
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
