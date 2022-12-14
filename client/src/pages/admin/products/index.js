import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import MenuAdmin from "../../../components/menu-admin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../../services/api";

const mdTheme = createTheme();

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProduct() {
      const response = await api.get("/api/products");
      setProducts(response.data);
    }
    loadProduct();
  }, []);

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
                  <h2>Produtos</h2>
                  <TableContainer sx={{ maxHeight: 440 }} size="small">
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>C??digo</TableCell>
                          <TableCell>Nome</TableCell>
                          <TableCell align="center">Unidade</TableCell>
                          <TableCell align="center">Grupo</TableCell>
                          <TableCell align="center">Subgrupo</TableCell>
                          <TableCell align="center">Estoque</TableCell>
                          <TableCell align="center">Pre??o</TableCell>
                          <TableCell align="center">Status</TableCell>
                          <TableCell align="center">Data de Cadastro</TableCell>
                          <TableCell align="center">Op????es</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.product_code}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.product_name}
                            </TableCell>
                            <TableCell align="center">
                              {row.product_unit}
                            </TableCell>
                            <TableCell align="center">
                              {row.product_group.group_code}
                            </TableCell>
                            <TableCell align="center">
                              {row.product_subgroup.subgroup_code}
                            </TableCell>
                            <TableCell align="center">
                              {new String(row.product_quantity).replace(".", ",")}
                            </TableCell>
                            <TableCell align="center">
                              {new String(row.product_price).replace(".", ",")}
                            </TableCell>
                            <TableCell align="center">
                              {row.product_status === 1 ? (
                                <Chip
                                  label="Ativo"
                                  color="success"
                                  size="small"
                                />
                              ) : (
                                <Chip
                                  label="Inativo"
                                  color="error"
                                  size="small"
                                />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(row.createdAt).toLocaleString("pt-br")}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                href={"/admin/products/edit/" + row._id}
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
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
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      <Button color="primary" href={"/admin/products/register"}>
                        NOVO CADASTRO
                      </Button>
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
