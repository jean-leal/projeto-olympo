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
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function ListSectors() {

  const [sectors, setSectors] = useState([]);
  useEffect(() => {
    async function loadSectors() {
      const response = await api.get('/api/sectors');
      setSectors(response.data);
    }
    loadSectors();
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //função para deletar grupo
  async function handleDelete(id) {
    if (window.confirm('Deseja realmente excluir este setor? ')) {
      var result = await api.delete('/api/sectors/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/sectors'
      } else {
        alert('Ocorreu um erro. Por favor tente novamente');
      }
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
                  <h2>Listagem de Setores</h2>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell>Nome</TableCell>
                          <TableCell align="center">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sectors.map((row) => (
                          <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.sector_code}</TableCell>
                            <TableCell component="th" scope="row">{row.sector_name}</TableCell>
                            <TableCell align="center">
                              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button color="primary" href={'/admin/sectors/edit/' + row._id} size="small">Editar</Button>
                                <Button color="error" onClick={() => handleDelete(row._id)} size="small">Excluir</Button>
                              </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={sectors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Grid>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button color="primary" href={'/admin/sectors/register'}>NOVO CADASTRO</Button>
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
