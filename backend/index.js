const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test';

// connect mongo
mongoose.connect(uri)
.then(()=> console.log('mongoose connected ...'))
.catch(err=> console.error('mongoose err', err));


// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favs', require('./routes/favs'));
app.use('/api/weather', require('./routes/weather'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log('server is listening at port :', PORT));