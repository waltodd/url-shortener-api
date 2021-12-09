
checkLengthUsernameOrPassword =  async (req, res, next) => {
    // nome do usuário 3 letras minimo
    if(req.body.name.length < 3) {
      return res.status(400).send({
          message: "O nome minimo 3 letras!"
      })
    }
  // nome do usuário 3 letras minimo
  if(req.body.username.length < 3) {
    return res.status(400).send({
        message: "O nome do usuário minimo 3 letras!"
    })
  }
  //password 6 letras minimo
  
  if(req.body.password.length < 6) {
      return res.status(400).send({
          message: "Senha no minimo 6 letras!"
      })
  }

  next()
    
}
  const validateSignUp = {
    checkLengthUsernameOrPassword
    
  };
  
  module.exports = validateSignUp;