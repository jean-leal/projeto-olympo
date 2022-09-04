const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
    sector_code:Number,
    sector_name:String,
},{
    timestamps:true,
});


const sectors = mongoose.model('Sectors', DataSchema);
module.exports = sectors;