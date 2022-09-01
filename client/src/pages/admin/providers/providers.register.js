import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import MenuAdmin from "../../../components/menu-admin";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import api from "../../../services/api";

const mdTheme = createTheme();

export default function ProductsRegister() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [ie, setIE] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCEP] = useState("");
  const [road, setRoad] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [contact, setContact] = useState("");

  async function handleSubmit() {
    const data = {
      provider_code: code,
      provider_name: name,
      provider_cnpj: cnpj,
      provider_ie: ie,
      provider_city: city,
      provider_state: state,
      provider_cep: cep,
      provider_road: road,
      provider_number: number,
      provider_district: district,
      provider_phoneContact: phoneContact,
      provider_emailContact: emailContact,
      provider_contact: contact,
    };
    if (code !== "" && name !== "") {
      const response = await api.post("/api/products", data);

      if (response.status === 200) {
        window.location.href = "/admin/products";
      } else {
        alert("erro de cadastro de Forncedor");
      }
    } else {
      alert("Preencha todos os dados!");
    }
  }
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuAdmin title={"FORNECEDORES"} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper sx={{ p: 2 }}>
                  <h2>Cadastro de Fornecedores</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="code"
                        name="code"
                        label="Código Cadastro"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="unity"
                        name="unity"
                        label="CNPJ"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Inscrição Estadual"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-select-small" required>
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={age}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={1}>Ativo</MenuItem>
                          <MenuItem value={2}>Inativo</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome Fantasia"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Razão Social"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Endereço"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Número"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Bairro"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="group"
                        name="group"
                        label="Cidade"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="subgroup"
                        name="subgroup"
                        label="Estado"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="price"
                        name="price"
                        label="CEP"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Telefone Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="E-mail Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} display="flex">
                      <Grid item xs={12} sm={2}>
                        <Button onClick={handleSubmit} variant="contained">
                          Salvar
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button
                          variant="contained"
                          color="error"
                          href="/admin/providers"
                        >
                          Cancelar
                        </Button>
                      </Grid>
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
