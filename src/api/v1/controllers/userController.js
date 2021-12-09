const db = require("../models");
const User = db.user;
const Url = db.url;
const auth = require("../../../config/authConfig");
const jwt = require("jsonwebtoken");


exports.userBoard = async (req, res) => {
    const {secret} = auth;
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, secret);



    await User.findOne({
        where: {uuid: decoded.uuid},attributes: ['name','username', 'email', 'createdAt', 'updatedAt'], include: Url
        
    }).then(user => {

        res.status(200).json({
            "description": "Dashboard usuário",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Não pode acessar dashboard usuário",
            "error": err
        });
    })
};
  
