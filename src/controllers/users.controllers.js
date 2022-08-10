const User = require('../models/user.model');

module.export = {
    index.get('/', function(req, res){
        res.json({message:'Olá Mundo'})
    })
    create(req,res){
        let msg = '';
        res.json({mgs:msg});
    }
}

/*
module.exports = {
    async index(req, res){
        const user = await User.find();
        res.json(user);
    },
    async create(req, res){
        const {user_name, user_login, user_type, user_password} = req.body;

        let data = {};

        let user = User.findOne({user_login});
        if(!user){
            data = {user_name, user_login, user_type, user_password};
            user = await User.create(data);
            return res.status(200).json(user);
        }else{
            return res.status(500).json(user);
        }
    },
    async details(req, res){
        const {_id} = req.params;
        const user = await User.findOne({_id});
        res.json(user);
    },
    async delete(req, res){
        const {_id} = req.params;
        const user = await User.findByIdAndDelete({_id});
        return res.json(user);
    }, 
    async update(req, res){
        const {_id, user_name, user_login, user_type, user_password} = req.body;
        const data = {user_name, user_login, user_type, user_password};
        const user = await User.findOneAndUpdate({_id}, data, {new:true});
        res.json(user);
    }
}
*/