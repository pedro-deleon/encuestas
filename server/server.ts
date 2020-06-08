import { Application } from "express";
import {generarCertificado, obtenerCertificadoPorUsuarioAndCurso} from './certificado.route';
import {encuestaContestada, obtenerCursos} from "./cursos/obtener-cursos";
import {crearUsuarioRoute} from "./user/crear-usuario.route";
import {getUser} from "./user/get-user.route";
import {logout} from "./user/logout.route";
import {login} from "./user/login.route";
import {actualizarUsuario} from "./user/actualizar.route";
import {obtenerCursosTerminadosPorUsuario} from "./cursos/cursos-terminados.route";
let express = require('express');

const app: Application = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


let mongoose = require('mongoose');




app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.use(cookieParser());

// Create link to Angular build directory
const distDir = "./dist/";

console.log(distDir);
app.use(express.static(distDir));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

if (!db) {
    console.log("Error al conectar con MongoDB");
} else {
    console.log("Conexión a MongoDB exitosa")
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


// Launch app to listen to specified port
app.listen(port, function () {

});






/**
 * app routes
 */

app.route('/api/certificado')
  .post(generarCertificado)


app.route('/api/obtenerCertificado')
  .post(obtenerCertificadoPorUsuarioAndCurso);


app.route('/api/cursos')
  .get(obtenerCursos)
  .post(obtenerCursosTerminadosPorUsuario)

app.route('/api/signup')
  .post(crearUsuarioRoute);

app.route('/api/user')
  .get(getUser)
  .post(actualizarUsuario);

app.route('/api/logout')
  .post(logout)


app.route('/api/login')
  .post(login)

app.route('/api/contestocurso')
  .post(encuestaContestada)
