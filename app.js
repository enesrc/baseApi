require("express-async-errors");
const express = require('express');
const app = express();
require('dotenv').config();
require('./src/db/dbConnection.js');
const port = process.env.PORT || 5001;
const router = require('./src/routers/index.js');
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.js");

//Middleware
app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Hoş Geldiniz' 
    });
});

app.use('/api', router);

//Hata yakalama
app.use(errorHandlerMiddleware);

app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor...`);
});