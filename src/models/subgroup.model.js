const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    subgroup_code:Number,
    subgroup_name:String,
},{
    timestamps:true,
});


const subgroup = mongoose.model('Subgroups', DataSchema);
module.exports = subgroup;