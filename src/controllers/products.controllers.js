const Product = require('../models/product.model');

module.exports = {
  async index(req, res) {
    const product = await Product.find();
    res.json(product);
  },
  async search(req, res) {
    const product_name = RegExp(req.body.searchProduct, 'i');
    const productSearch = await Product.findOne({ product_name });
    res.json(productSearch);
  },
  async create(req, res) {
    const {
      product_code,
      product_unit,
      product_name,
      product_group,
      product_subgroup,
      product_price,
      product_quantity,
      product_status
    } = req.body;
    let data = {};
    
    let product = await Product.findOne({ product_code });

    if (!product) {
      data = {
        product_code,
        product_unit,
        product_name,
        product_group,
        product_subgroup,
        product_price,
        product_quantity,
        product_status
      };

      product = await Product.create(data);
      return res.status(200).json(product);
    } else {
      return res.status(500).json({ msg: "falha de cadastro" });
    }

  },
  async details(req, res) {
    const { _id } = req.params;
    const product = await Product.findOne({ _id });
    res.json(product);
  },
  async delete(req, res) {
    const { _id } = req.params;
    const product = await Product.findByIdAndDelete({ _id });
    return res.json(product);
  },
  async update(req, res) {
    const {
      _id,
      product_code,
      product_unit,
      product_name,
      product_group,
      product_subgroup,
      product_price,
      product_quantity,
      product_status } = req.body;
    const data = {
      product_code,
      product_unit,
      product_name,
      product_group,
      product_subgroup,
      product_price,
      product_quantity,
      product_status
    };
    const product = await Product.findOneAndUpdate({ _id }, data, { new: true });
    res.json(product);
  }
}