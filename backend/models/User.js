const mongoose = require('mongoose');
const S = new mongoose.Schema({
em: { type:String, required:true, unique:true },
pw: { type:String, required:true },
nm: String
}, { timestamps:true });
module.exports = mongoose.model('User', S);