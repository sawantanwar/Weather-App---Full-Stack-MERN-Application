const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req,res)=>{
const { em, pw, nm } = req.body;
if(!em || !pw) return res.status(400).json({ err:'invalid' });
try{
const ex = await User.findOne({ em });
if(ex) return res.status(400).json({ err:'exists' });
const h = await bcrypt.hash(pw, 10);
const u = await User.create({ em, pw: h, nm });
const tk = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn:'30min' });
res.json({ token: tk, user: { id: u._id, em: u.em, nm: u.nm }});
}catch(e){
res.status(500).json({ err:'reg fail' });
}
};


exports.login = async (req,res)=>{
const { em, pw } = req.body;
if(!em || !pw) return res.status(400).json({ err:'invalid' });
try{
const u = await User.findOne({ em });
if(!u) return res.status(400).json({ err:'no user' });
const ok = await bcrypt.compare(pw, u.pw);
if(!ok) return res.status(400).json({ err:'bad creds' });
const tk = jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn:'30min' });
res.json({ token: tk, user: { id: u._id, em: u.em, nm: u.nm }});
}catch(e){ res.status(500).json({ err:'login fail' }); }
};