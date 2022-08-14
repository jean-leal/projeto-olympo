const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const destroy = require('destroy');
const secret = "mysecret";

module.exports = {
    async index(req, res){
            const user = await User.find()
            res.json(user)
    }, 
     async create(req, res){
            const {user_name, user_login, user_type, user_password} = req.body;
            let data = {};
            let user = await User.findOne({user_login});
    
            if(!user){
                data = {user_name, user_login, user_type, user_password};
    
                user = await User.create(data);
                return res.status(200).json(user);
            }else{
                return res.status(500).json({msg:"falha de cadastro"});
            }
            
    },
    async details(req, res){
        const {_id} = req.params;
        const user = await User.findOne({_id});
         res.json(user);
    },
    async delete (req, res){
        const {_id} = req.params;
        const user = await User.findByIdAndDelete({_id});
        return res.json(user);
    },
    async update(req, res){
        const {_id ,user_name, user_login, user_type, user_password} = req.body;
        const data = {user_name, user_login, user_type, user_password};
        const user = await User.findOneAndUpdate({_id}, data, {new : true});

        res.json(user);
    },
    async login(req, res){
        const {login, password} = req.body;
        User.findOne({user_login:login, user_type:1 }, function(err, user){
            if(err){
                console.log(err);
                res.status(200).json({error: ' Erro no servidor, tente novamente!'})
            }else if (!user){
                res.status(200).json({status:1, error:' Login não encontrado no banco de dados'})
            }else{
                user.isCorrectPassword(password, async function(err, same){
                    if (err){
                        res.status(200).json({error:' Erro no servidor, tente novamete'});
                    }else if (!same){
                        res.status(200).json({status:2, error:' A senha não confere'})
                    }else{
                        const payload = {login};
                        const token = jwt.sign(payload, secret, {
                        expiresIn:'24h'
                    })
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status:1, auth:true, token:token, id_user:user._id, user_name:user.user_name});
                    }
                })
                }
        })
    },
    async checkToken (req, res){
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401, msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status:401, msg:'Não autorizado: Token inválido!'}); 
                }else{
                    res.json({status:200})
                }
            })
        }
    }, 
    async destroyToken(req,res){
        const token = req.headers.token;
        if (token){
            res.cookie('token', null, {httpOnly:true});
        }else{
            req.status(401).sed('Logout não autorizado!');
        }
        res.send('Sessão finalzada com sucesso!');
    }
}