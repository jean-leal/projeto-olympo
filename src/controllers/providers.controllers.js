const Provider = require('../models/providers.model');

module.exports = {
    async index(req, res){
        const provider = await Provider.find();
        res.json(provider);
    },
    async create(req, res){
        const {provider_code, provider_status, provider_name, provider_fantasyName, provider_cnpj, 
          provider_ie, provider_city, provider_state, provider_cep, provider_address,
          provider_number, provider_district, provider_phoneContact, provider_emailContact, provider_contact} = req.body;
        let data = {};
        let provider = await Provider.findOne({provider_cnpj});

        if(!provider){
            data = {provider_code, provider_status, provider_name, provider_fantasyName, provider_cnpj,
              provider_ie, provider_city, provider_state, provider_cep, provider_address,
              provider_number, provider_district, provider_phoneContact, provider_emailContact,
              provider_contact};
            provider = await Provider.create(data);
            return res.status(200).json(provider);
        }else{
            return res.status(500).json({msg:"falha de cadastro"});
        }
        
    },
    async update(req, res){
      const {_id, provider_code, provider_status, provider_name, provider_fantasyName, provider_cnpj, 
        provider_ie, provider_city, provider_state, provider_cep, provider_address,
        provider_number, provider_district, provider_phoneContact, provider_emailContact, provider_contact} = req.body;
      const data = {provider_code, provider_status, provider_name, provider_fantasyName, provider_cnpj, 
        provider_ie, provider_city, provider_state, provider_cep, provider_address,
        provider_number, provider_district, provider_phoneContact, provider_emailContact, provider_contact};
      const provider = await Provider.findOneAndUpdate({_id}, data, {new:true});
      res.json(provider);
  },
    async details(req, res){
        const {_id} = req.params;
        const provider = await Provider.findOne({_id});
        res.json(provider);
    },/*
    async delete(req, res){
        const {_id} = req.params;
        const group = await Group.findByIdAndDelete({_id});
        return res.json(group);
    }, 
    */
}