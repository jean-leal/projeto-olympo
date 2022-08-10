import * as React from 'react';
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

const mdTheme = createTheme();

export default function UserRegister() {
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
                    <h2>Formulário de Cadastro</h2>
                    <Grid container spacing={3}> 
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="firstName"
                          name="firstName"
                          label="First name"
                          fullWidth
                          autoComplete="given-name"
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="lastName"
                          name="lastName"
                          label="Last name"
                          fullWidth
                          autoComplete="family-name"
                          variant="standard"
                        />
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
