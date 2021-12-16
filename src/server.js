const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser());
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors({
  credentials: 'include'
}));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));


const db = require("../src/api/v1/models");

db.sequelize.sync({
  force: false
}).then(() => {
  console.log('Drop and Resync Db');
});


// simple route
const authRoute = require('../src/api/v1/routes/authRoute');
const userRoute = require('../src/api/v1/routes/userRoute')
const urlRoute = require('../src/api/v1/routes/urlRoute')

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/url', urlRoute);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});