"use strict";
exports.__esModule = true;
var certificado_route_1 = require("./certificado.route");
var obtener_cursos_1 = require("./cursos/obtener-cursos");
var crear_usuario_route_1 = require("./user/crear-usuario.route");
var get_user_route_1 = require("./user/get-user.route");
var logout_route_1 = require("./user/logout.route");
var login_route_1 = require("./user/login.route");
var actualizar_route_1 = require("./user/actualizar.route");
var cursos_terminados_route_1 = require("./cursos/cursos-terminados.route");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/encuestas', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
if (!db) {
    console.log("Error al conectar con MongoDB");
}
else {
    console.log("Conexión a MongoDB exitosa");
}
// Setup server port
var port = process.env.PORT;
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
    }
    else {
        next();
    }
};
// Send message for default URL
app.get('/', function (req, res) { return res.send('API Encuestas'); });
// Launch app to listen to specified port
app.listen(port, function () {
});
/**
 * app routes
 */
app.route('/api/certificado')
    .post(certificado_route_1.generarCertificado);
app.route('/api/obtenerCertificado')
    .post(certificado_route_1.obtenerCertificadoPorUsuarioAndCurso);
app.route('/api/cursos')
    .get(obtener_cursos_1.obtenerCursos)
    .post(cursos_terminados_route_1.obtenerCursosTerminadosPorUsuario);
app.route('/api/signup')
    .post(crear_usuario_route_1.crearUsuarioRoute);
app.route('/api/user')
    .get(get_user_route_1.getUser)
    .post(actualizar_route_1.actualizarUsuario);
app.route('/api/logout')
    .post(logout_route_1.logout);
app.route('/api/login')
    .post(login_route_1.login);
app.route('/api/contestocurso')
    .post(obtener_cursos_1.encuestaContestada);
