const config = require("../../../config/authConfig");
const db = require("../models");
const User = db.user;
const {v4: uuidv4} = require("uuid")



var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup =  async(req, res) => {
    const info = {
      uuid: uuidv4(),
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    }
    await User.create(info);
    res.status(200).json({
      "message": "Usuário criado com successo!",
      "user": info
    });

};

exports.signin = async (req, res) => {
  const user = await User.findOne({where :{
    username: req.body.username
  }})

    if (!user) {
        return res.send({ message: "Usuário ou senha inválida." });
    }
    console.log(user);
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Usuário ou senha inválida."
        });
      }

      var token = jwt.sign({ uuid: user.uuid }, config.secret, {
        expiresIn: 8400 // 24 hours
      });

      res.status(200).send({
        uuid: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
};

