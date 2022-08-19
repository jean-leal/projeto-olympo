import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../../../services/api';

const mdTheme = createTheme();

export default function LowStock() {
    const [search, setSearch] = useState('');

    async function handleSubmit() {
        await api.post('/api/products/search', { search }).then(res => {
            setSearch(res.data)

        })
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {

        async function loadProduct() {
            const response = await api.get('/api/products');
            setProducts(response.data);
        }
        loadProduct();
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MenuAdmin title={'BAIXA DE ESTOQUE'} />
                <Box component="main" sx={{
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
                                <Paper sx={{ p: 1 }}>
                                    <h2>Baixa de Estoque</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <Box>
                                                <div>
                                                    <TextField
                                                        label="Código Setor"
                                                        id="outlined-size-small"
                                                        size="small"

                                                    />
                                                    <IconButton size="normal" onClick={handleClickOpen}>
                                                        <SearchIcon />
                                                    </IconButton>
                                                    <TextField
                                                        label="Nome Cadastro"
                                                        id="outlined-size-small"
                                                        size="small"
                                                    />
                                                </div>
                                            </Box>
                                            <>
                                                {/* CONTEUDO PESQUISAR-*/}
                                                <Dialog open={open} onClose={handleClose}>
                                                    <DialogTitle>Pesquisa</DialogTitle>
                                                    <DialogContent>
                                                        <TextField
                                                            label="Nome"
                                                            id="searchName"
                                                            size="small"
                                                            value={search}
                                                            onChange={e => setSearch(e.target.value)}
                                                        />
                                                        <IconButton size="normal" onClick={handleSubmit}>
                                                            <SearchIcon />
                                                        </IconButton>
                                                        <TableContainer sx={{ maxHeight: 440 }}>
                                                            <Table stickyHeader aria-label="sticky table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Código</TableCell>
                                                                        <TableCell>Nome</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {products.map((row) => (
                                                                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                            <TableCell component="th" scope="row">{row.product_code}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.product_name}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </>
                                            {/* FIM CONTEUDO PESQUISAR*/}
                                        </Grid>
                                    </Grid>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Código</TableCell>
                                                    <TableCell>Nome</TableCell>
                                                    <TableCell>Unidade</TableCell>
                                                    <TableCell>Estoque</TableCell>
                                                    <TableCell>Preço</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row"></TableCell>
                                                    <TableCell component="th" scope="row"></TableCell>
                                                    <TableCell align="center">---</TableCell>
                                                    <TableCell align="center">---</TableCell>
                                                    <TableCell align="center">---</TableCell>
                                                    <TableCell align="center">{ }</TableCell>
                                                    <TableCell align="center">{ }</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}