import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import MenuAdmin from "../../../components/menu-admin";
import TablePagination from "@mui/material/TablePagination";
import api from "../../../services/api";

const mdTheme = createTheme();

export default function ListLowReport() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [lowStockReport, setLowStockReport] = useState([]);
  useEffect(() => {
    async function loadReport() {
      const response = await api.get("/api/low-stock");
      setLowStockReport(response.data);
    }
    loadReport();
  }, []);
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuAdmin title={"RELATÓRIO DE BAIXA DE ESTOQUE"} />
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
                  <h2>Listagem de Baixa</h2>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>                        
                          <TableCell>Número Documento</TableCell>
                          <TableCell>Código Setor</TableCell>
                          <TableCell>Nome Setor</TableCell>
                          <TableCell>Valor Total Doc.</TableCell>
                          <TableCell>Data Documento </TableCell>
                          <TableCell>Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {lowStockReport.map((row) => (
                          <TableRow
                            sx={{ "& > *": { borderBottom: "unset" } }}
                            key={row._id}
                          >
                            <TableCell component="th" scope="row">
                              {row.low_stock_code}
                            </TableCell>
                            <TableCell >
                              {row.sector_low_stock.sector_code}
                            </TableCell>
                            <TableCell >
                              {row.sector_low_stock.sector_name}
                            </TableCell>
                            <TableCell >
                              {row.total_price_document}
                            </TableCell>
                            <TableCell > {new Date(row.createdAt).toLocaleString("pt-br")}</TableCell>                   
                            <TableCell align="center">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                href={"/admin/low-stock/edit/" + row._id}
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
                    count={lowStockReport.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
