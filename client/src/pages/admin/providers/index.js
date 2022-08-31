import React, {useState, useEffect} from 'react';
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

export default function ListProducts() {

  const [products, setProducts] = useState([]);
  useEffect(()=>{
    async function loadProduct(){
      const response = await api.get('/api/products');
      setProducts(response.data);
    }
    loadProduct();
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


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <MenuAdmin title={'FORNECEDORES'}/>
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
                <h2>Fornecedores</h2>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                      <TableCell>Código</TableCell>
                      <TableCell>CNPJ</TableCell>
                      <TableCell align="center">Razão Social</TableCell>
                      <TableCell align="center">Fantasia</TableCell>
                      <TableCell align="center">Tipo de Cadastro</TableCell>
                      <TableCell align="center">Cidade</TableCell>
                      <TableCell align="center">UF</TableCell>                      
                      <TableCell align="center">Data de Cadastro</TableCell>  
                      <TableCell align="center">Opções</TableCell>                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((row) => (
                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">{row.product_code}</TableCell>
                              <TableCell component="th" scope="row">{row.product_name}</TableCell>
                              <TableCell align="center">---</TableCell>
                              <TableCell align="center">---</TableCell>
                              <TableCell align="center">{row.product_amount}</TableCell>
                              <TableCell align="center">{row.product_price}</TableCell>
                              <TableCell align="center">---</TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                  <Button color="primary" href={'/admin/products/edit/'+row._id}>Editar</Button>
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
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              <Grid sx={{ mt: 2, mb: 2 }}>             
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button color="primary" href={'/admin/providers/register'}>NOVO CADASTRO</Button>
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
