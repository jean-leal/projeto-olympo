import React,{useState} from 'react';
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

export default function ProductsRegister() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSubmit(){
    const data = {
      product_code:code,
      product_name : name,
      product_description : description,
      product_price : price,
      product_amount : amount}
    
      if(code!=='' && name!=='' && description!=='' && price!=='' && amount!==''){
        const response = await api.post('/api/products', data);
      
      if (response.status === 200){
        window.location.href='/admin/products'
      }else{
        alert('erro de cadastro de produto');
      } }else{
        alert('Preencha todos os dados!');
      }
      
  }
   
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <MenuAdmin title = {'PRODUTOS'} />
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
                    <h2>Cadastro de Produto</h2>
                    <Grid container spacing={3}> 
                      <Grid item xs={12} sm={4}>
                        <TextField
                          required
                          id="code"
                          name="code"
                          label="Código"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          value={code}
                          onChange={e => setCode (e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                      <TextField
                          required
                          id="unity"
                          name="unity"
                          label="Unidade"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                      <TextField
                          required
                          id="status"
                          name="status"
                          label="Status"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          id="name"
                          name="name"
                          label="Nome"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          value={name}
                          onChange={e => setName (e.target.value)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                      <TextField
                          required
                          id="group"
                          name="group"
                          label="Grupo"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                      <TextField
                          required
                          id="subgroup"
                          name="subgroup"
                          label="Subgrupo"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          required
                          id="price"
                          name="price"
                          label="Preço"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          value={price}
                          onChange={e => setPrice (e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          required
                          id="amount"
                          name="amount"
                          label="Quantidade Estoque"
                          fullWidth
                          autoComplete="none"
                          variant="standard"
                          value={amount}
                          onChange={e => setAmount (e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>                        
                          <Button onClick={handleSubmit} variant="contained">Salvar</Button>                             
                          <Button variant="contained" color = "error" href="/admin/products">Cancelar</Button>                       
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
