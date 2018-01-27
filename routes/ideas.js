const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  res.send('This is ideas page')
})

module.exports = router;