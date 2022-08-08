const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projectDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('conectado');
        }
    });
