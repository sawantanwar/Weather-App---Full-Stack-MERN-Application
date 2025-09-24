const r = require('express').Router();
const ctl = require('../controllers/weatherController');

r.get('/', ctl.get);
module.exports = r;