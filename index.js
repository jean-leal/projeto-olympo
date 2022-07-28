const express = require ('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');

const port = 8080;
let path = require('path');
const app = express();

let login = 'admin';
let password = '123';

app.use(session({secret: 'sldkn1f3l2d6slnsnfskdnmflk'}));
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', (req, res) => {
    if(req.body.password == password && req.body.login == login){
        //Logado com sucesso!
        req.session.login = login;
        res.render('logado', {login: login});
    }else{
        res.render('index');
    }
})

app.get('/', (req, res) =>{
    if(req.session.login){
        res.render('logado', {login: login});
        console.log('O usuario logado é: ' + req.session.login)
    } else{
        res.render('index');
    }
})

app.listen(port, () => {
    console.log('servidor rodando');
})
