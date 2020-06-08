"use strict";
exports.__esModule = true;
var session_1 = require("./session");
var SessionStore = /** @class */ (function () {
    function SessionStore() {
        this.sessions = {};
    }
    SessionStore.prototype.createSession = function (sessionId, user) {
        this.sessions[sessionId] = new session_1.Session(sessionId, user);
    };
    SessionStore.prototype.findUserBySessionId = function (sessionId) {
        var session = this.sessions[sessionId];
        return this.isSessionValid(sessionId) ? session.user : undefined;
    };
    SessionStore.prototype.isSessionValid = function (sessionId) {
        var session = this.sessions[sessionId];
        return session && session.isValid();
    };
    SessionStore.prototype.destroySession = function (sessionId) {
        delete this.sessions[sessionId];
    };
    return SessionStore;
}());
exports.sessionStore = new SessionStore();
