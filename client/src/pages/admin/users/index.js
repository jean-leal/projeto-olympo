import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import MenuAdmin from '../../../components/menu-admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function ListUsers() {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/api/users');
      setUsers(response.data);
    }
    loadUsers();
  }, [])

  //função para deletar o usuário
  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este usuário? ')) {
      var result = await api.delete('/api/users/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/users'
      } else {
        alert('Ocorreu um erro. Por favor tente novamente');
      }
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
                  <h2>Listagem de Usuários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="center">Login</TableCell>
                              <TableCell align="center">Tipo</TableCell>
                              <TableCell align="center">Data de Cadastro</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.user_name}
                                </TableCell>
                                <TableCell align="center">{row.user_login}</TableCell>
                                <TableCell align="center">{row.user_type === 1 ?
                                  <Chip label="Administrador" color="secondary" /> :
                                  <Chip label="Usuário Padrão" color="primary" />}</TableCell>
                                <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                <TableCell align="center">
                                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button color="primary" href={'/admin/users/edit/' + row._id}size="small">Editar</Button>
                                    <Button color="secondary" onClick={() => handleDelete(row._id)}size="small">Excluir</Button>
                                  </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                  <Grid sx={{ mt: 2, mb: 2 }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button color="primary" href={'/admin/users/register'}>NOVO CADASTRO</Button>
                    </ButtonGroup>
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
