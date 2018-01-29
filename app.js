//Library
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const models = require('./models')
const session = require('express-session')
var cookieParser = require('cookie-parser')
 
//Model
const ideas = require('./routes/ideas.js')
const user = require('./routes/user.js')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat'
}))

  
// app.get('/', (req,res) => res.send(`<center><h1><a href = "/ideas"> ideas </a> <br><a href = "/user"> user </a></h1></center>`));
app.use('/ideas', ideas);
app.use('/user', user);


app.listen(3000, () => console.log('Cek TKP di Port 3000 gan!!'))