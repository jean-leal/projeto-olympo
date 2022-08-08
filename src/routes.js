const express = require('express');

const routes = express.Router();

const User = require('./controllers/users.controllers');

routes.post('/api/users', User.create);
routes.get('/api/users', User.index);
routes.get('/api/users.details', User.details);
routes.delete('/api/users:_id', User.delete)
routes.put('/api/users', User.update);



module.exports = routes;