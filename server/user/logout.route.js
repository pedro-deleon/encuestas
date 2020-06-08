"use strict";
exports.__esModule = true;
var session_store_1 = require("./session-store");
function logout(req, res) {
    var sessionId = req.cookies['SESSIONID'];
    session_store_1.sessionStore.destroySession(sessionId);
    res.clearCookie("SESSIONID");
    res.sendStatus(204);
}
exports.logout = logout;
