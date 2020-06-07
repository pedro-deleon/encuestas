import {Usuario} from "./user/usuario-model";

const util = require('util');
const crypto2 = require('crypto');

export const randomBytes = util.promisify(crypto2.randomBytes)

