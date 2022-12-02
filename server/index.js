const express = require('express');
const cors = require("cors");
const app = express();
const clientApi = require('./api/registrationApi');
const clientEventApi = require("./api/clientEventApi");

const apiRouter = require('./routes/api');


app.use(cors());
app.use(express.json());

// db (models)
require('./models/Client');
require('./models/ClientEvent')

// routes
app.use('/', apiRouter);

//api
app.use("/api/client", clientApi);
app.use("/api/clientEvent", clientEventApi);


// server
app.listen(8080, function(){
    console.log('Serwer Node.js działa');
});