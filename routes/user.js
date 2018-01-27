var express = require('express');
var router = express.Router();
const models = require('./models');


router.get('/', (req, res) => {
  res.send('This is user page')
})

module.exports = router;