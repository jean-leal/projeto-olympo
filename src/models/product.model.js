const mongoose = require('mongoose');


const DataSchema = new mongoose.Schema({
  product_code: Number,
  product_name: String,
  product_price: Number,
  product_unit: String,
  product_group: Object,
  product_subgroup: Object,
  product_price: Number,
  product_quantity: { type: Number, default: 0 },
  product_status:Number
}, {
  timestamps: true,
});


const products = mongoose.model('Products', DataSchema);
module.exports = products;