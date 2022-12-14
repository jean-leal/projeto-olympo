const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const DataSchema = new mongoose.Schema({
    user_name:String,
    user_login:String,
    user_type: {type:Number, default:1},
    user_password:String,


},{
    timestamps:true,
});

DataSchema.pre('save', function(next){
    if (!this.isModified('user_password')){
        return next();
    }
    this.user_password = bcrypt.hashSync(this.user_password, 10);
    next();
});

DataSchema.pre('findOneAndUpdate', function(next){
    var password = this.getUpdate().user_password+'';
    if (password.length < 55){
        this.getUpdate().user_password = bcrypt.hashSync(password, 10);
    }
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback){
    bcrypt.compare(password, this.user_password, function (err,same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    }
)}

const users = mongoose.model('Users', DataSchema);
module.exports = users;
