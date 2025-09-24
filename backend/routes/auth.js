const r = require('express').Router();
const ctl = require('../controllers/authController');
r.post('/register', ctl.register);
r.post('/login', ctl.login);
module.exports = r;