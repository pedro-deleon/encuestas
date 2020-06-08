"use strict";
exports.__esModule = true;
var session_store_1 = require("./session-store");
function getUser(req, res) {
    var sessionId = req.cookies['SESSIONID'];
    var user = session_store_1.sessionStore.findUserBySessionId(sessionId);
    if (user) {
        res.status(200).json({
            email: user.email,
            nombre: user.nombre,
            apellidoPaterno: user.apellidoPaterno,
            apellidoMaterno: user.apellidoMaterno
        });
    }
    else {
        res.sendStatus(204);
    }
}
exports.getUser = getUser;
