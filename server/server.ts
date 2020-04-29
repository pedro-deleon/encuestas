import { Application } from "express";
import { obtenerCertificado } from './certificado.route';
let express = require('express');

const app: Application = express();

const bodyParser = require('body-parser');

let mongoose = require('mongoose');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

var db = mongoose.connection;

if (!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully")
}

// Setup server port
let port: any = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
};


// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});






/**
 * app routes
 */

app.route('/api/certificado')
    .get(obtenerCertificado)