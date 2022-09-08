import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

const mdTheme = createTheme();

export default function UserRegister() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [group, setGroup] = useState("");
  const [subgroup, setSubgroup] = useState("");
  const [status, setStatus] = useState("");
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);

  const { idProduct } = useParams();

  useEffect(() => {
    async function getUser() {
      var response = await api.get("/api/products.details/" + idProduct);
      setCode(response.data.product_code);
      setUnit(response.data.product_unit);
      setName(response.data.product_name);
      setPrice(response.data.product_price);
      setQuantity(response.data.product_quantity);
      setStatus(response.data.product_status);
      setGroup(response.data.product_group);
      setSubgroup(response.data.product_subgroup);
    }
    getUser();

    async function loadGroups() {
      const response = await api.get("/api/groups");
      setGroups(response.data);
    }
    loadGroups();
    async function loadSubgroups() {
      const response = await api.get("/api/subgroups");
      setSubgroups(response.data);
    }
    loadSubgroups();
  }, []);

  async function handleSubmit() {
    const data = {
      _id: idProduct,
      product_code: code,
      product_unit: unit,
      product_name: name,
      product_group: {
        _id: group._id,
        group_code: group.group_code,
        group_name: group.group_name,
      },
      product_subgroup: {
        _id: subgroup._id,
        subgroup_code: subgroup.subgroup_code,
        subgroup_name: subgroup.subgroup_name,
      },
      product_price: price,
      product_quantity: quantity,
      product_status: status,
    };

    if (code !== "" && code !== "" && price !== "" && quantity !== "") {
      const response = await api.put("/api/products", data);

      if (response.status === 200) {
        window.location.href = "/admin/products/";
      } else {
        alert("Erro de atualização de usuário!");
      }
    } else {
      alert("Preencha todos os dados!");
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuAdmin title={"PRODUTOS"} />
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
                  <h2>Atualização de Produtos</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="code"
                        name="code"
                        label="Código"
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
                        label="Unidade"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth size="small">
                        <InputLabel required id="status" label="status">
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
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" size="small">
                          Grupo
                        </InputLabel>
                        <Select
                          name="select_group"
                          size="small"
                          value={group}
                          label="Grupo"
                          onChange={(e) => setGroup(e.target.value)}
                        >
                          {groups.map(group => {
                            return (
                              <MenuItem key={group.group_code} value={group}>
                                {group.group_code + " - " + group.group_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel size="small" label="subgrupo">
                          Subgrupo
                        </InputLabel>
                        <Select
                          size="small"
                          value={subgroup}
                          label="subgrupo"
                          onChange={(e) => setSubgroup(e.target.value)}
                        >
                          {subgroups.map((subgroup) => {
                            return (
                              <MenuItem
                                key={subgroup.subgroup_code}
                                value={subgroup}
                              >
                                {subgroup.subgroup_code +
                                  " - " +
                                  subgroup.subgroup_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="price"
                        name="price"
                        label="Preço"
                        fullWidth
                        autoComplete="none"
                        size="small"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
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
                        size="small"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button onClick={handleSubmit} variant="contained">
                        Salvar
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        href="/admin/products"
                      >
                        Cancelar
                      </Button>
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
