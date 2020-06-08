"use strict";
exports.__esModule = true;
var moment = require("moment");
var Session = /** @class */ (function () {
    function Session(sessionId, user) {
        this.sessionId = sessionId;
        this.user = user;
        this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
    }
    Session.prototype.isValid = function () {
        return moment().diff(this.validUntil, 'minutes') <= 0;
    };
    Session.VALIDITY_MINUTES = 60;
    return Session;
}());
exports.Session = Session;
