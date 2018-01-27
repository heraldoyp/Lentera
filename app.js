const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const models = require('./models')
const ideas = require('./routes/ideas.js')
const user = require('./routes/user.js')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => models.Ideas.findAll().then(hehe => res.send(`<img src ='${hehe[0].image}'>`)))
app.use('/ideas', ideas);
app.use('/user', user);



app.listen(3000, () => console.log('Cek TKP di Port 3000 gan!!'))