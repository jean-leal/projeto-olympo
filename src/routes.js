const express = require('express');


const routes = express.Router();
const User = require ('./controllers/users.controllers');
const Product = require('./controllers/products.controllers');
const Group = require('./controllers/groups.controllers');
const Subgroup = require('./controllers/subgroups.controllers');
const Providers = require('./controllers/providers.controllers');
const Sector = require('./controllers/sectors.controllers');
const LowStock = require('./controllers/low-stock.controllers')

routes.get('/',User.index);


//rotas de Usuarios
routes.post('/api/users',User.create);
routes.get('/api/users',User.index);
routes.get('/api/users.details/:_id', User.details);
routes.delete('/api/users/:_id', User.delete);
routes.put('/api/users', User.update);
routes.post('/api/users/login',User.login);
routes.get('/api/users/checktoken',User.checkToken);
routes.get('/api/users/destroyToken',User.destroyToken);



//rotas de Produtos
routes.post('/api/products',Product.create);
routes.post('/api/products/search',Product.search);//rota para pesquisa
routes.get('/api/products/search',Product.search);
routes.get('/api/products',Product.index);
routes.get('/api/products.details/:_id', Product.details);
routes.delete('/api/products/:_id', Product.delete);
routes.put('/api/products', Product.update);
routes.put('/api/products/update-stock', Product.updateStock);
routes.post('/api/products/search.extortion-stock', Product.searchStock);


//rotas de Grupos
routes.post('/api/groups',Group.create);
routes.get('/api/groups',Group.index);
routes.get('/api/groups.details/:_id', Group.details);
routes.delete('/api/groups/:_id', Group.delete);
routes.put('/api/groups', Group.update);

//rotas de Subgrupos
routes.post('/api/subgroups',Subgroup.create);
routes.get('/api/subgroups',Subgroup.index);
routes.get('/api/subgroups.details/:_id', Subgroup.details);
routes.delete('/api/subgroups/:_id', Subgroup.delete);
routes.put('/api/subgroups', Subgroup.update);

//rotas de Fornecedores 
routes.post('/api/providers',Providers.create);
routes.get('/api/providers',Providers.index);
routes.put('/api/providers', Providers.update);
routes.get('/api/providers.details/:_id', Providers.details);
//routes.delete('/api/subgroups/:_id', Subgroup.delete);

//rotas de Setores
routes.post('/api/sectors',Sector.create);
routes.get('/api/sectors',Sector.index);
routes.get('/api/sectors.details/:_id', Sector.details);
routes.delete('/api/sectors/:_id', Sector.delete);
routes.put('/api/sectors', Sector.update);
routes.post('/api/sectors/search',Sector.search);//rota para pesquisa
routes.get('/api/sectors/search',Sector.search);

//rotas para baixa de estoque
routes.post('/api/low-stock',LowStock.create);
routes.get('/api/low-stock',LowStock.index);
routes.get('/api/low-stock.details/:_id', LowStock.details);
routes.delete('/api/low-stock/:_id', LowStock.delete);
routes.put('/api/low-stock', LowStock.update);
routes.post('/api/low-stock/search',LowStock.search);

module.exports = routes;