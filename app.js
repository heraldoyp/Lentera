const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const models = require('./models')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => models.Ideas.findAll().then(hehe => res.send(`<img src ='${hehe[0].image}'>`)))

app.listen(3000, () => console.log('Cek TKP di Port 3000 gan!!'))


// req.body.imgst = "<img src ='"
// req.body.img = url
// req.body.imgen = "'>"

// // {
// //   image = 
// // }