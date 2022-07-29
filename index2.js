const express = require ('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');

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

app.post('/', (req, res)=>{
    console.log(req.body.login)
    res.render('index2');
})

app.get('/', (req, res)=>{
    res.reder('index2');
})