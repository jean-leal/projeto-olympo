const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    group_code:Number,
    group_name:String,
},{
    timestamps:true,
});


const groups = mongoose.model('Groups', DataSchema);
module.exports = groups;