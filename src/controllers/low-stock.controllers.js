const LowStock = require("../models/low.stock.model");

module.exports = {
  async index(req, res) {
    const lowStock = await LowStock.find();
    res.json(lowStock);
  },
  async search(req, res) {
    const low_stock_code = req.body.lowStockCode;
    let lowStock = await LowStock.findOne().sort({low_stock_code:-1})
    let returnCode = 0
    if(lowStock === null || lowStock === undefined){
      returnCode = null
    }else{
      returnCode = (lowStock.low_stock_code)
    } 
    if (returnCode === null) {
      const cont = 1;
      return res.status(200).json(cont)
    } else {
      const cont = (returnCode + 1)
      return res.status(200).json(cont)
    }
  },
  async create(req, res) {
    const {
      total_price_document,
      low_stock_code,
      sector_low_stock,
      list_itens,
    } = req.body;
    let data = {};
    let lowStock = await LowStock.findOne({ low_stock_code });
    if (!lowStock) {
      data = {
        total_price_document,
        low_stock_code,
        sector_low_stock,
        list_itens,
      };

      lowStock = await LowStock.create(data);
      return res.status(200).json(lowStock);
    } else {
      return res.status(500).json({ msg: "falha de cadastro" });
    }
  },
  async details(req, res) {
    const { _id } = req.params;
    const lowStock = await LowStock.findOne({ _id });
    res.json(lowStock);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const lowStock = await LowStock.findByIdAndDelete({ _id });
    return res.json(lowStock);
  },
  async update(req, res) {
    const {
      total_price_document,
      low_stock_code,
      sector_low_stock,
      list_itens,
    } = req.body;
    //const search = await LowStock.findOne({ low_stock_code });
    //const _id = search._id
    const data = {
      total_price_document,
      low_stock_code,
      sector_low_stock,
      list_itens,
    };
    const lowStock = await LowStock.findOneAndUpdate({ low_stock_code }, data, {
      new: true,
    });
    res.json(lowStock);
  },
};
