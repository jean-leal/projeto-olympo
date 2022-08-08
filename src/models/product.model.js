const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const DataSchema = new mongoose.Schema({
    product_code:Number,
    product_name:String,
    product_description:String,
    product_price:Number,
    product_amount: {type:Number, default:0},
},{
    timestamps:true,
});


const products = mongoose.model('Products', DataSchema);
module.exports = products;