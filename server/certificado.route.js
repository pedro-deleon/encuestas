"use strict";
exports.__esModule = true;
var session_store_1 = require("./user/session-store");
var respuestas_mongo_1 = require("./encuestas/respuestas-mongo");
var fs = require('fs');
var pdf = require('html-pdf');
var options = {
    width: "900px",
    height: "550px"
};
function generarCertificado(request, response) {
    var sessionId = request.cookies['SESSIONID'];
    var user = session_store_1.sessionStore.findUserBySessionId(sessionId);
    if (!session_store_1.sessionStore.isSessionValid(sessionId)) {
        response.sendStatus(403);
    }
    else {
        var html = crearCertificado(request.body.fechaEmision, request.body.participante, request.body.horasCurso, request.body.curso.nombre, request.body.instructorCurso, request.body.pagina);
        pdf.create(html, options).toStream(function (err, stream) {
            var dir = "./server/certificados/" + request.body.participante;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            respuestas_mongo_1.agregarRespuestasPorUsuario(user, request.body.preguntasEncuesta, request.body.curso, response).then(function (value) {
                if (value === 1) {
                    stream.pipe(fs.createWriteStream(dir + "/" + request.body.curso.nombre_corto + ".pdf"));
                    console.log("Certificado de " + request.body.participante + " creado con \u00E9xito");
                    response.status(200).json({ mensaje: 'Certificado creado con éxito' });
                }
                else if (value === 0) {
                    response.sendStatus(403);
                }
            });
        });
    }
}
exports.generarCertificado = generarCertificado;
/**
 * TODO agregar como parámetro en el body el nombre corto del curso.
 * @param req
 * @param res
 */
function obtenerCertificadoPorUsuarioAndCurso(req, res) {
    /**
     * En base al nombre del usuario voy a obtener el certificado de ese usuario
     * */
    var sessionId = req.cookies['SESSIONID'];
    var nombre = req.body.nombre;
    var cursoAbr = req.body.cursoAbr;
    console.log(req.body.nombre);
    console.log('Body obtener certificado');
    console.log(req.body);
    if (!session_store_1.sessionStore.isSessionValid(sessionId)) {
        res.sendStatus(403);
    }
    else {
        res.sendFile("./certificados/" + nombre + "/" + cursoAbr + ".pdf", { root: __dirname });
    }
}
exports.obtenerCertificadoPorUsuarioAndCurso = obtenerCertificadoPorUsuarioAndCurso;
function crearCertificado(fechaEmision, participante, horas, capacitacion, instructor, pagina) {
    var html = "<!doctype html>\n        <html>\n           <head>\n                <meta charset=\"utf-8\">\n                <title>PDF Result Template</title>\n                <link href=\"https://fonts.googleapis.com/css2?family=Ubuntu&display=swap\" rel=\"stylesheet\">\n                <style>\n                /*\n                  oscuro : #343434\n                  blancoso: #ffffff\n                */\n                body,html{\n                  position: relative;\n                  margin: 0;\n                  font-family: 'Ubuntu', sans-serif;\n                  letter-spacing: 2.5px;\n                }\n\n                .reksai-container{\n                  width: 100%;\n                  height: 900px;\n                  background-color: #ffffff;\n                  color: white;\n\n                }\n\n                .header{\n                  width: 100%;\n                  height: 150px;\n                  background-color: #343434;\n                  color: white;\n                }\n\n\n\n                .header img{\n                    margin-left: 15px;\n                }\n\n                .header div{\n                    margin-right: 45px;\n                    float: right;\n                    margin-top: 60px;\n                }\n\n                .curso-info{\n                  text-align: center;\n                  color: #343434;\n                }\n\n                .curso-info .cabecera{\n                  font-size: 2.5em;\n                  margin-bottom: 0px;\n                }\n\n                .curso-info .bold-text{\n                  font-size: 3.4em;\n                  font-weight: bold;\n                  margin-bottom: 0px;\n                  margin-top : 0px;\n                }\n\n                .curso-info .simple-text{\n                  font-size: 1.5em;\n                }\n\n\n                .footer{\n                  position: absolute;\n                  bottom: 0;\n                  width: 100%;\n                  text-align: left;\n                  color: #343434;\n                }\n\n                .cnt-instructor{\n                  margin-top: 110px;\n                  font-size: 1.5em;\n                }\n\n                .cnt-instructor hr{\n                  width: 20%;\n                  margin-top: 0px;\n                }\n\n                .footer p{\n                  margin-left: 30px;\n                }\n                </style>\n            </head>\n            <body>\n                <div class=\"reksai-container\">\n                <div class=\"header\">\n                <div>Emitido el " + fechaEmision + "</div>\n                <img src=\"https://raw.githubusercontent.com/pedro-deleon/my-assets/master/cdis-logo.png\" alt=\"logo cdis uanl\" width=\"220\">\n\n                </div>\n\n                <div class=\"curso-info\">\n                <p class=\"cabecera\">Esto certifica que</p>\n                <p class=\"bold-text\">" + participante + "</p>\n                <p class=\"simple-text\">completo exitosamente la capacitaci\u00F3n:</p>\n                <p class=\"bold-text\">" + capacitacion + "</p>\n                <p class=\"simple-text\">representando aproximadamente " + horas + " horas de trabajo</p>\n                <div class=\"firma-instructor\">\n\n                </div>\n\n                <div class=\"cnt-instructor\">\n                    <img src=\"https://raw.githubusercontent.com/pedro-deleon/my-assets/master/sign.png\" alt=\"firma instructor\" width=\"150\">\n                    <hr>\n                    <p class=\"instructor\">" + instructor + "</p>\n                    <p class=\"instructor\">Instructor, CDIS UANL</p>\n                </div>\n                </div>\n\n\n                <div class=\"footer\">\n                <p>Puedes verificar esta certificaci\u00F3n en: " + pagina + "</p>\n                </div>\n\n                </div>\n            </body>\n        </html>\n    ";
    return html;
}
