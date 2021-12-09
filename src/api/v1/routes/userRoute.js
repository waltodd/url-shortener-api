const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");
const express = require('express')
const router = express.Router();

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/profile", [authJwt.verifyToken], controller.userBoard);

  module.exports = router;