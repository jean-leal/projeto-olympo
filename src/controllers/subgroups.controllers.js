const Subgroup = require('../models/subgroup.model');

module.exports = {
    async index(req, res){
        const subgroup = await Subgroup.find();
        res.json(subgroup);
    },
    async create(req, res){
        const {subgroup_code, subgroup_name} = req.body;
        let data = {};
        let subgroup = await Subgroup.findOne({subgroup_code});

        if(!subgroup){
            data = {subgroup_code, subgroup_name};

            subgroup = await Subgroup.create(data);
            return res.status(200).json(subgroup);
        }else{
            return res.status(500).json({msg:"falha de cadastro"});
        }
        
    },
    async details(req, res){
        const {_id} = req.params;
        const subgroup = await Subgroup.findOne({_id});
        res.json(subgroup);
    },
    async delete(req, res){
        const {_id} = req.params;
        const subgroup = await Subgroup.findByIdAndDelete({_id});
        return res.json(subgroup);
    }, 
    async update(req, res){
        const {_id, subgroup_code, subgroup_name} = req.body;
        const data = {subgroup_code, subgroup_name};
        const subgroup = await Subgroup.findOneAndUpdate({_id}, data, {new:true});
        res.json(subgroup);
    }
}