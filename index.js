const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const port = 3000;
let path = require('path');
const app = express();


mongoose.connect('mongodb+srv://admin:086015@cluster0.k0ngrzw.mongodb.net/projectDB?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        return console.log('conectado');
    })
    .catch((err) => {
        return console.log(err);
    });
    
let login = 'admin';
let password = '123';

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/image'));

app.use(session({ secret: 'sldkn1f3l2d6slnsnfskdnmflk' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', (req, res) => {
    if (req.body.password == password && req.body.login == login) {
        //Logado com sucesso!
        req.session.login = login;
        res.render('logado', { login: login });
    } else {
        res.render('index');
    }
})

app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('logado', { login: login });
        console.log('O usuario logado é: ' + req.session.login)
    } else {
        res.render('index');
    }
})

app.use(routes);
app.listen(port, () => {
    console.log('servidor rodando');
})
