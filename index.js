const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const port = 5000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb+srv://admin:086015@cluster0.k0ngrzw.mongodb.net/projectDB?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        return console.log('Banco conectado');
    })
    .catch((err) => {
        return console.log(err);
    });
    
app.listen(port, function(){
    console.log(`Servidor rodando ${port}`);
})
