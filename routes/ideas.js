const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Ideas.findAll({order : [['id', 'ASC']]}).then(result => res.render('ideas.ejs', datas=result))
})

router.get('/view/:id', (req, res) => {
  models.Ideas.findById(req.params.id).then(data => res.render('ideasbyid.ejs', idea = data))
})

router.get('/edit/:id', (req, res) => {
  models.Ideas.findById(req.params.id).then(data => res.render('editidea.ejs', idea = data))
})

router.post('/edit/:id', (req, res) => {
  let newdata = {
    overview : req.body.overview,
    image : req.body.image,
    option : req.body.option
  }
  models.Ideas.update(newdata, {where: {id: req.params.id}}).then(data => res.redirect('/ideas'))
})

router.get('/create', (req, res) => {
  res.render('createideas.ejs')
})

router.post('/create', (req, res) => {
  let newidea = {
    overview : req.body.overview,
    image : req.body.image,
    option : req.body.option
  }
  models.Ideas.create(newidea).then(data => res.redirect('/ideas'))
})


router.get('/delete/:id', (req, res) => {
  models.Ideas.destroy({where: {id: req.params.id}}).then(deleted => res.redirect('/ideas'))
})


module.exports = router;