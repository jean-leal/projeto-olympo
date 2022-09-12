const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    low_stock_code: Number,
    total_price_document: { type: Number, default: 0 },
    sector_low_stock: {
      _id: { type: String, default: " " },
      sector_code: { type: Number, default: 0 },
      sector_name: { type: String, default: " " },
    },
    list_itens: {
      item_list: [
        {
          _id: { type: String, default: " " },
          product_code:{ type: Number, default: 0 },
          product_name: { type: String, default: " " },
          product_unit: { type: String, default: " " },
          product_qtyLow: { type: Number, default: 0 },
          product_price: { type: Number, default: 0 },
          product_totalPrice: { type: Number, default: 0 },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const lowStock = mongoose.model("LowStock", DataSchema);
module.exports = lowStock;
