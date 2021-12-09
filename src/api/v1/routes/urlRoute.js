const { authJwt } = require("../middlewares");
const express = require('express');
const router = express.Router();

    const url = require("../controllers/urlShortController");
    router.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  
    // Criar uma url
    router.post("/create", url.create);
  
    // Retornar todas urls criada por usuarios autenticados
    router.get("/all", url.findAllUrlUserNotAuth);
  
    // Retornar todas urls criada por usuarios autenticados
    router.get("/auth-user", url.findAllUrlUserAuth);
  
  
    // Apagar url criada por usuario autenticado
    router.delete("/:uuid", url.delete);

    module.exports = router ;