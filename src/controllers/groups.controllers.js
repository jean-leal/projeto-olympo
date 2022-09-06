const Group = require('../models/group.model');

module.exports = {
    async index(req, res){
        const group = await Group.find();
        res.json(group);
    },
    async create(req, res){
        const {group_code, group_name} = req.body;
        let data = {};
        let group = await Group.findOne({group_code});
        if(!group){
            data = {group_code, group_name};
            group = await Group.create(data);
            return res.status(200).json(group);
        }else{
            return res.status(500).json({msg:"falha de cadastro"});
        }
        
    },
    async details(req, res){
        const {_id} = req.params;
        const group = await Group.findOne({_id});
        res.json(group);
    },
    async delete(req, res){
        const {_id} = req.params;
        const group = await Group.findByIdAndDelete({_id});
        return res.json(group);
    }, 
    async update(req, res){
        const {_id, group_code, group_name} = req.body;
        const data = {group_code, group_name};
        const group = await Group.findOneAndUpdate({_id}, data, {new:true});
        res.json(group);
    }
}