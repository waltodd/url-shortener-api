const db = require("../models");
const User = db.user;


checkDuplicateUsernameOrEmail =  async (req, res, next) => {
  
  const username = await User.findOne({where:{
    username: req.body.username
  }})
    if (username) {
      res.status(400).send({ message: "Nome do Usuário já está a ser usado!" });
      return;
    }

    // Email
     const email = await User.findOne({where:{
      email: req.body.email
    }})
      if(email) {
        res.status(400).send({ message: "Email já está a ser usado!" });
        return;
      }

      next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
  
};

module.exports = verifySignUp;