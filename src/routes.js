const express = require('express');

const routes = express.Router();

routes.get('/', function(req, res){
    res.json({message:'Olá Mundo'})
});

/*
const User = require('./controllers/users.controllers');
const Product = require('./controllers/products.controllers');

routes.get('/', User.index);
//rotas de Usuarios
routes.post('/api/users', User.create);
routes.get('/api/users', User.index);
routes.get('/api/users.details', User.details);
routes.delete('/api/users:_id', User.delete)
routes.put('/api/users', User.update);

//rotas de produtos
routes.post('/api/product', Product.create);
routes.get('/api/product', Product.index);
routes.get('/api/product.details', Product.details);
routes.delete('/api/product:_id', Product.delete)
routes.put('/api/product', Product.update);
*/




module.exports = routes;