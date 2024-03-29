const db = require("../models");
const Url = db.url;
const User = db.user;
const Op = db.Sequelize.Op;
const config = require("../../../config/authConfig");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')


// Criar uma url
exports.create = async  (req, res) => {
  
   // Validate request
   if (!req.body.full) {
    res.status(400).send({
      message: "Campo url vazio !"
    });
    return;
  }
    const {secret} = config;
    const token = req.headers['x-access-token']
    const userInfo = jwt.decode(token, secret);
    
    const { uuid } = userInfo || {};
    // Criar a Url
    const url = {
      full: req.body.full,
      userUuid:uuid
    };    
  // Salvar url na db
  await Url.create(url)
    .then(url => {
      res.send({
        'url':url,
        message:'Url encurtada com sucesso !'
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro enquanto encurtavamos a url!"
      });
    });

};
// Retornar todas url para usuario não autenticado
exports.findAll = async (req, res) => {
  await Url.findAll({order: [
    ['clicks', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
]})
  .then(data => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  })
};


// Retornar todas url para usuario não autenticado
exports.findAllUrlUserNotAuth = async (req, res) => {
  await Url.findAll({where:{ userUuid : null}})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  })
};

// Retornar todas url para usuario autenticado
exports.findAllUrlUserAuth = async (req, res) => {

  const {secret} = config;
  const token = req.headers['x-access-token']
  const userInfo = jwt.decode(token, secret);

  console.log(userInfo)
    
  const { uuid } = userInfo || {};
  await Url.findAll({where: {userUuid:uuid}})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  })
};
exports.shortUrl = async (req, res) => {
  console.log(req.params)

  const shortUrl = await Url.findOne({where: {short:req.params.shortUrl}})
  if (!shortUrl) {
    res.status(404).send({
      message: "Url não foi encontrada!"
    });
    return;
  }
  shortUrl.clicks++
  shortUrl.save();
  // console.log(shortUrl)
  // res.send({
  //   shortUrl
  // })
   res.send({
    shortUrl
  })

},


// Eliminar url criada por usuário
exports.delete = async (req, res) => {
  const {secret} = config;
  const token = req.headers['x-access-token']
  const userInfo = jwt.decode(token, secret);
  if (!token) {
    res.status(400).send({
      message: "Token vazio!"
    });
    return;
  }
  const urlUuid = req.params.uuid;
  console.log(urlUuid)
  if(!urlUuid) {
    res.status(400).send({
      message: "Url não existe"
    });
    return;
  }
  const { uuid } = userInfo || {};
  const result = await Url.findAll({where: {userUuid:uuid}})

  console.log(result)

  await Url.destroy({where: {uuid: urlUuid}})
  .then((url) => {
    res.status(200).json({
      "message": "Url apagada com successo!",
      "url": url
    });

    return
  })
  .catch((err) => {
    res.send(err);
  })

};

