const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Ideas.findAll().then(result => res.render('ideas.ejs', datas=result))
})

router.get('/:id', (req, res) => {
  models.Ideas.findById(req.params.id).then(data => res.render('ideasbyid.ejs', idea = data))
})


module.exports = router;