"use strict";
exports.__esModule = true;
var passwordValidator = require('password-validator');
// Create a schema
var schema = new passwordValidator();
// Add properties to it
schema
    .is().min(10) // Minimum length 8
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits() // Must have digits
    .has().not().spaces() // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
function validatePassword(password) {
    return schema.validate(password, { list: true });
}
exports.validatePassword = validatePassword;
