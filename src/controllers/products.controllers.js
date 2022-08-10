const Product = require('../models/product.model');

module.exports = {
    async index(req, res){
        const product = await Product.find();
        res.json(product);
    },
    async create(req, res){
        const {product_code, product_name, product_description, product_price, product_amount} = req.body;
        let data = {};
        let product = Product.findOne({product_code});

        if(!product){
            data = {product_code, product_name, product_description, product_price, product_amount};
            product = await Product.create(data);
            return res.status(200).json(product);
        }else{
            return res.status(500).json(product);
        }
    },
    async details(req, res){
        const {_id} = req.params;
        const product = await Product.findOne({_id});
        res.json(product);
    },
    async delete(req, res){
        const {_id} = req.params;
        const product = await Product.findByIdAndDelete({_id});
        return res.json(product);
    }, 
    async update(req, res){
        const {_id, product_code, product_name, product_description, product_price, product_amount} = req.body;
        const data = {product_code, product_name, product_description, product_price, product_amount};
        const product = await Product.findOneAndUpdate({_id}, data, {new:true});
        res.json(product);
    }
}