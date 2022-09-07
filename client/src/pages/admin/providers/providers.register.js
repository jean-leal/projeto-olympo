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

export default function ProvidersRegister() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [fantasyName, setFantasyName] = useState("");
  const [name, setName] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [ie, setIE] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cep, setCEP] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [contact, setContact] = useState("");

  async function handleSubmit() {
    const data = {
      provider_code: code,
      provider_status: status,
      provider_name: name,
      provider_fantasyName: fantasyName,
      provider_cnpj: cnpj,
      provider_ie: ie,
      provider_city: city,
      provider_state: state,
      provider_cep: cep,
      provider_address: address,
      provider_number: number,
      provider_district: district,
      provider_phoneContact: phoneContact,
      provider_emailContact: emailContact,
      provider_contact: contact,
    };
    console.log(data)
    if (code !== "" && name !== "" && cnpj !== "" && ie !== "" && phoneContact !== "") {
      const response = await api.post("/api/providers", data);

      if (response.status === 200) {
        window.location.href = "/admin/providers";
      } else {
        alert("erro de cadastro de Forncedor");
      }
    } else {
      alert("Preencha todos os dados!");
    }
  }

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
                        id="cnpj"
                        name="cnpj"
                        label="CNPJ"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={cnpj}
                        onChange={(e) => setCNPJ(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="ie"
                        name="ie"
                        label="Inscrição Estadual"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={ie}
                        onChange={(e) => setIE(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="status" label="status" required>
                          Status
                        </InputLabel>
                        <Select
                          label="status"
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value={1}>Ativo</MenuItem>
                          <MenuItem value={2}>Inativo</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="fantasyName"
                        name="fantasyName"
                        label="Nome Fantasia"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={fantasyName}
                        onChange={(e) => setFantasyName(e.target.value)}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="address"
                        name="address"
                        label="Endereço"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <TextField
                        required
                        id="number"
                        name="number"
                        label="Número"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="district"
                        name="district"
                        label="Bairro"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="city"
                        name="city"
                        label="Cidade"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="state"
                        name="state"
                        label="Estado"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        required
                        id="cep"
                        name="cep"
                        label="CEP"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={cep}
                        onChange={(e) => setCEP (e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="phoneContact"
                        name="phoneContact"
                        label="Telefone Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={phoneContact}
                        onChange={(e) => setPhoneContact(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="emailContact"
                        name="emailContact"
                        label="E-mail Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={emailContact}
                        onChange={(e) => setEmailContact(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="contact"
                        name="contact"
                        label="Contato"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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
