const r = require('express').Router();
const ctl = require('../controllers/favController');
const auth = require('../middlewares/auth');

r.use(auth);
r.post('/', ctl.add);
r.delete('/', ctl.remove);
r.get('/', ctl.list);

module.exports = r;