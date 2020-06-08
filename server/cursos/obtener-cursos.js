"use strict";
exports.__esModule = true;
var curso_model_1 = require("./curso-model");
var session_store_1 = require("../user/session-store");
var respuestas_mongo_1 = require("../encuestas/respuestas-mongo");
function obtenerCursos(request, response) {
    var sessionId = request.cookies["SESSIONID"];
    var isSessionValid = session_store_1.sessionStore.isSessionValid(sessionId);
    if (!isSessionValid) {
        response.sendStatus(403);
    }
    else {
        curso_model_1.curso.find(function (err, cursos) {
            if (err) {
                console.error(err);
            }
            response.status(200).json(cursos);
        });
    }
}
exports.obtenerCursos = obtenerCursos;
function encuestaContestada(req, res) {
    var sessionId = req.cookies['SESSIONID'];
    var user = session_store_1.sessionStore.findUserBySessionId(sessionId);
    var cursoAbr = req.body.cursoAbr;
    console.log(cursoAbr);
    if (!user) {
        res.sendStatus(403);
    }
    else {
        respuestas_mongo_1.encuestaContestadaPorUsuario(user, cursoAbr).then(function (encuesta) {
            if (encuesta) {
                res.status(200).json(true);
            }
            else {
                res.status(200).json(false);
            }
        });
    }
}
exports.encuestaContestada = encuestaContestada;
