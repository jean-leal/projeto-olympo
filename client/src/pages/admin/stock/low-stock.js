import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import MenuAdmin from "../../../components/menu-admin";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import api from "../../../services/api";
import DeleteIcon from "@mui/icons-material/Delete";

const mdTheme = createTheme();
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LowStock() {
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [value, setValue] = useState(0);
  const [searchSector, setSearchSector] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [reqSector, setReqSector] = useState([]);
  const [reqProduct, setReqProduct] = useState([]);
  const [sectorCode, setSectorCode] = useState("");
  const [sectorName, setSectorName] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productId, setProductId] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQtyLow, setProductQtyLow] = useState("");
  const [listItens, setListItem] = useState([]);
  const [newItem, setNewItem] = useState([]);
  const [LowStockCode, setLowStockCode] = useState("")
  const [addItem, setAddItem] = useState(false);

  const totalPrice = productPrice * productQtyLow;
  
  const totalPriceList = listItens.reduce(getTotal, 0)
  function getTotal(total, item){
    return total + item.product_totalPrice;
  }
 
  console.log(totalPriceList)
  const clearState = () => {
    setReqSector("");
    setSearchSector("");
    setSearchProduct("");
    setReqProduct("");
  };
  const clearStateSearch = () => {
    setProductCode("");
    setProductName("");
    setProductQuantity("");
    setProductId("");
    setProductPrice("");
    setProductQtyLow("");
    setProductUnit("");
  };
  const data = {
    sector_code: LowStockCode,
    sector_low_stock: {
      _id: sectorId,
      sector_code: sectorCode,
      sector_name: sectorName,
    },
    list_itens: {
      item_list : listItens
     
    }
  };
  console.log(data)
  console.log(listItens.length)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function sectorSearch() {
    await api.post("/api/sectors/search", { searchSector }).then((res) => {
      !res.data ? alert("Setor não encontrado") : setReqSector(res.data);
    });
  }

  async function productSearch() {
    await api.post("/api/products/search", { searchProduct }).then((res) => {
      !res.data ? alert("Produto não encontrado") : setReqProduct(res.data);
    });
  }

  async function insertSector() {
    setSectorCode(reqSector.sector_code);
    setSectorName(reqSector.sector_name);
    setSectorId(reqSector._id);
    clearState();
    handleClose();
  }

  function insertProduct() {
    setProductCode(reqProduct.product_code);
    setProductName(reqProduct.product_name);
    setProductUnit(reqProduct.product_unit);
    setProductQuantity(reqProduct.product_quantity);
    setProductPrice(reqProduct.product_price);
    setProductId(reqProduct._id);
    clearState();
    CloseSearchProduct();
  }
  // função para adicionar os itens a listagem
  function insertListItens() {
    setNewItem({
      _id: productId,
      product_code: productCode,
      product_name: productName,
      product_unit: productUnit,
      product_qtyLow: productQtyLow,
      product_price: productPrice,
      product_totalPrice: totalPrice
    });
    setAddItem(true);
  }
  if (addItem === true) {
    addItemList();
  } else {
  }
  function addItemList() {
    if (listItens) {
      setListItem([...listItens, newItem]);
    } else {
      setListItem([newItem]);
    }
    clearStateSearch();
    setAddItem(false);
  }

  function deletItemList(index) {
    let tempArray = [...listItens];
    tempArray.splice(index, 1);
    setListItem(tempArray);
  }

  //inicio função procurar setor
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    clearState();
  };
  //fim função dialogo de setor

  //inicio função procurar produto
  const OpenSearchProduct = () => {
    setOpenProduct(true);
  };
  const CloseSearchProduct = () => {
    setOpenProduct(false);
    clearState();
  };
  //fim função procurar produto

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MenuAdmin title={"BAIXA DE ESTOQUE"} />
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
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Paper sx={{ p: 1 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="Número Documento"
                        id="outlined-size-small"
                        size="small"
                        value={LowStockCode}
                        onChange={(e) => setLowStockCode(e.target.value)}
                      />
                    </Grid>                    
                    <Grid item xs={12} sm={9}></Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="Código Setor"
                        id="outlined-size-small"
                        size="small"
                        value={sectorCode}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <IconButton size="normal" onClick={handleClickOpen}>
                        <SearchIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nome Cadastro"
                        id="outlined-size-small"
                        size="small"
                        value={sectorName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {/* CONTEUDO PESQUISAR SETOR*/}
                      <>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          sx={{ minHeight: 440 }}
                        >
                          <DialogTitle>Pesquisa de Setor</DialogTitle>
                          <DialogContent>
                            <TextField
                              label="Nome"
                              id="searchName"
                              size="small"
                              value={searchSector}
                              onChange={(e) => setSearchSector(e.target.value)}
                            />
                            <IconButton size="normal" onClick={sectorSearch}>
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
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th">
                                      {reqSector ? reqSector.sector_code : "-"}
                                    </TableCell>
                                    <TableCell component="th">
                                      {reqSector ? reqSector.sector_name : "-"}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={insertSector}>Inserir</Button>
                            <Button onClick={handleClose}>Cancelar</Button>
                          </DialogActions>
                        </Dialog>
                      </>
                      {/* FIM CONTEUDO PESQUISAR SETOR*/}
                    </Grid>
                    <Grid item sm={12}>
                      <Box
                        sx={{ borderBottom: 1, borderColor: "divider", m: 0 }}
                      >
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab label="Inserir Item" {...a11yProps(0)} />
                          <Tab label="Lista de Itens" {...a11yProps(1)} />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0}>
                        <Box sx={{ display: "flex" }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={2}>
                              <TextField
                                label="Código Produto"
                                id="outlined-size-small"
                                defaultValue=""
                                size="small"
                                value={productCode}
                              />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <IconButton
                                size="normal"
                                onClick={OpenSearchProduct}
                              >
                                <SearchIcon />
                              </IconButton>
                            </Grid>
                            {/* CONTEUDO PESQUISAR PRODUTO*/}
                            <>
                              <Dialog
                                open={openProduct}
                                onClose={CloseSearchProduct}
                                sx={{ minHeight: 440 }}
                              >
                                <DialogTitle>Pesquisa de Produto</DialogTitle>
                                <DialogContent>
                                  <TextField
                                    label="Nome"
                                    id="searchName"
                                    size="small"
                                    value={searchProduct}
                                    onChange={(e) =>
                                      setSearchProduct(e.target.value)
                                    }
                                  />
                                  <IconButton
                                    size="normal"
                                    onClick={productSearch}
                                  >
                                    <SearchIcon />
                                  </IconButton>
                                  <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table
                                      stickyHeader
                                      aria-label="sticky table"
                                    >
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Código</TableCell>
                                          <TableCell>Nome</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        <TableRow
                                          sx={{
                                            "&:last-child td, &:last-child th":
                                              {
                                                border: 0,
                                              },
                                          }}
                                        >
                                          <TableCell component="th">
                                            {reqProduct
                                              ? reqProduct.product_code
                                              : "-"}
                                          </TableCell>
                                          <TableCell component="th">
                                            {reqProduct
                                              ? reqProduct.product_name
                                              : "-"}
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={insertProduct}>
                                    Inserir
                                  </Button>
                                  <Button onClick={CloseSearchProduct}>
                                    Cancelar
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </>
                            {/* FIM CONTEUDO PESQUISAR PRODUTO*/}
                            <Grid item xs={12} sm={7}>
                              <TextField
                                fullWidth
                                label="Descrição"
                                id="outlined-size-small"
                                defaultValue=""
                                size="small"
                                value={productName}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}></Grid>
                            <Grid item xs={12} sm={1}>
                              <TextField
                                label="Unidade"
                                size="small"
                                value={productUnit}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <TextField
                                label="Quantidade"
                                size="small"
                                value={productQtyLow}
                                onChange={(e) =>
                                  setProductQtyLow(e.target.value)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <TextField
                                label="Valor Unitário"
                                id="outlined-size-small"
                                defaultValue=""
                                size="small"
                                value={productPrice}
                              />
                            </Grid>
                            <Grid item xs={12} sm={5} align="right">
                              <TextField
                                label="Valor Total"
                                size="small"
                                value={totalPrice}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2}></Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField
                                sx={{ width: 120 }}
                                label="Estoque atual"
                                size="small"
                                value={productQuantity}
                              />
                            </Grid>
                            <Grid item xs={12} sm={2} align="right"></Grid>
                            <Grid item xs={12} sm={12} align="lefth">
                              <Button
                                variant="contained"
                                onClick={insertListItens}
                              >
                                Inserir Item
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                          <Table
                            stickyHeader
                            size="small"
                            aria-label="sticky table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Unidade</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Valor Unitário</TableCell>
                                <TableCell>Valor Total</TableCell>
                                <TableCell>Opções</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {listItens.map((item, index) => (
                                <TableRow key={item._id}>
                                  <TableCell component="th">
                                    {item.product_code}
                                  </TableCell>
                                  <TableCell component="th">
                                    {item.product_name}
                                  </TableCell>
                                  <TableCell>{item.product_unit}</TableCell>
                                  <TableCell>{item.product_qtyLow}</TableCell>
                                  <TableCell>{item.product_price}</TableCell>
                                  <TableCell>
                                    {item.product_totalPrice}
                                  </TableCell>
                                  <TableCell>
                                    <IconButton
                                      aria-label="delete"
                                      size="small"
                                      onClick={() => deletItemList(index)}
                                    >
                                      <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Grid item xs={12} sm={12} align="right">
                      <h3>TOTAL: R${totalPriceList}</h3>
                    </Grid>
                      </TabPanel>
                    </Grid>
                    <Grid item xs={12} sm={7}></Grid>
                    <Grid item xs={12} sm={3} align="right">
                      <Button variant="contained">Salvar Documento</Button>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Button variant="contained" color="error">
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
