const Sector = require('../models/sector.model');

module.exports = {
    async index(req, res){
        const sector = await Sector.find();
        res.json(sector);
    },
    async create(req, res){
        const {sector_code, sector_name} = req.body;
        let data = {};
        let sector = await Sector.findOne({sector_code});

        if(!sector){
            data = {sector_code, sector_name};

            sector = await Sector.create(data);
            return res.status(200).json(sector);
        }else{
            return res.status(500).json({msg:"falha de cadastro"});
        }
        
    },
    async details(req, res){
        const {_id} = req.params;
        const sector = await Sector.findOne({_id});
        res.json(sector);
    },
    async delete(req, res){
        const {_id} = req.params;
        const sector = await Sector.findByIdAndDelete({_id});
        return res.json(sector);
    }, 
    async update(req, res){
        const {_id, sector_code, sector_name} = req.body;
        const data = {sector_code, sector_name};
        const sector = await Sector.findOneAndUpdate({_id}, data, {new:true});
        res.json(sector);
    },async search(req, res) {
      const { search } = req.body;
      const sectorSearch = await Sector.findOne({sector_name:search});
      res.json(sectorSearch);    
  }
}