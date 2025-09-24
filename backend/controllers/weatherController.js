const axios = require('axios');

exports.get = async (req,res)=>{
const q = req.query.q;
if(!q) return res.status(400).json({ err:'missing q' });
try{
    // console.log('OpenWeather API Key:', process.env.OPENWEATHER_KEY);
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${process.env.OPENWEATHER_KEY}`;
const r = await axios.get(url);
res.json(r.data);
}catch(e){
const code = e.response?.status || 500;
res.status(code).json({ err:'weather fetch fail' });
}
};