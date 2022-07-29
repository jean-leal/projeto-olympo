const {app, BrowserWindow} = require('electron');

//janela principal
let mainWindow = null;
async function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    });

    await mainWindow.loadFile('views/index.html');
}
// on ready
app.whenReady().then(createWindow);
//----------------------------------------------------------
const express = require ('express');
const session = require ('express-session');
const bodyParser = require ('body-parser');

let path = require('path');
const exp = express();

let login = 'admin';
let password = '123';

exp.use(session({secret: 'sldkn1f3l2d6slnsnfskdnmflk'}));
exp.use(bodyParser.urlencoded({extended:true}));

exp.engine('html', require('ejs').renderFile);
exp.set('view engine', 'html');
exp.use('/public', express.static(path.join(__dirname, 'public')));
exp.set('views', path.join(__dirname, '/views'));

exp.post('/', (req, res)=>{
    console.log(req.body.login)
    res.render('index2');
})

exp.get('/', (req, res)=>{
    res.reder('index2');
})