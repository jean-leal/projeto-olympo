const express = require('express');


const routes = express.Router();
const User = require ('./controllers/users.controllers');
const Product = require('./controllers/products.controllers');
const Group = require('./controllers/groups.controllers');
const Subgroup = require('./controllers/subgroups.controllers');


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
routes.post('/api/products/search',Product.search);//rota da pesquisa, teste
routes.get('/api/products/search',Product.search);
routes.get('/api/products',Product.index);
routes.get('/api/products.details/:_id', Product.details);
routes.delete('/api/products/:_id', Product.delete);
routes.put('/api/products', Product.update);

//rotas de Grupos
routes.post('/api/groups',Group.create);
routes.get('/api/groups',Group.index);
routes.get('/api/groups.details/:_id', Group.details);
routes.delete('/api/groups/:_id', Group.delete);
routes.put('/api/groups', Group.update);

//rotas de Grupos
routes.post('/api/subgroups',Subgroup.create);
routes.get('/api/subgroups',Subgroup.index);
routes.get('/api/subgroups.details/:_id', Subgroup.details);
routes.delete('/api/subgroups/:_id', Subgroup.delete);
routes.put('/api/subgroups', Subgroup.update);

module.exports = routes;