const mongoose = require('mongoose');
const S = new mongoose.Schema({
uid: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
cty: String,
createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Fav', S);