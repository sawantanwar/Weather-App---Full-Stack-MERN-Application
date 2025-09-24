const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
const h = req.headers.authorization || '';
const tk = h.split(' ')[1];
if(!tk) return res.status(401).json({ err:'no token' });
try{
const p = jwt.verify(tk, process.env.JWT_SECRET);
req.uid = p.id;
next();
}catch(e){
return res.status(401).json({ err:'bad token' });
}
};