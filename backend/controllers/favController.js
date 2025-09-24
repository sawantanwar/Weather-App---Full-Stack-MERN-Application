const Fav = require('../models/Fav');


exports.add = async (req,res)=>{
const { cty } = req.body;
if(!cty) return res.status(400).json({ err:'no city' });
try{
const ex = await Fav.findOne({ uid: req.uid, cty });
if(ex) return res.json({ ok:true, msg:'already' });
await Fav.create({ uid: req.uid, cty });
res.json({ ok:true });
}catch(e){ res.status(500).json({ err:'fav add fail' }); }
};


exports.remove = async (req,res)=>{
const { cty } = req.body;
if(!cty) return res.status(400).json({ err:'no city' });
try{
await Fav.deleteMany({ uid: req.uid, cty });
res.json({ ok:true });
}catch(e){ res.status(500).json({ err:'fav remove fail' }); }
};


exports.list = async (req,res)=>{
try{
const a = await Fav.find({ uid: req.uid }).sort('-createdAt').select('cty -_id');
res.json(a.map(x=>x.cty));
}catch(e){ res.status(500).json({ err:'fav list fail' }); }
};