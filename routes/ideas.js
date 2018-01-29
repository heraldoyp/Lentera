const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Idea.findAll({order : [['id', 'ASC']], include: [models.Perk]}).then(result => 
    // res.render('ideas.ejs', datas=result))
    res.send(result)) //Perks one-to-many relation testing
})

router.get('/view/:id', (req, res) => {
  models.Idea.findById(req.params.id).then(data => res.render('ideasbyid.ejs', idea = data))
})

router.get('/edit/:id', (req, res) => {
  models.Idea.findById(req.params.id).then(data => res.render('editidea.ejs', idea = data))
})

router.post('/edit/:id', (req, res) => {
  let newdata = {
    overview : req.body.overview,
    image : req.body.image,
    option : req.body.option
  }
  models.Idea.update(newdata, {where: {id: req.params.id}}).then(data => res.redirect('/ideas'))
})

router.get('/create', (req, res) => {
  if(req.session.logged === true){
  res.render('createideas.ejs')
  }else{
    res.send("Login dulu bang")
  }
})

router.post('/create', (req, res) => {
  let newidea = {
    overview : req.body.overview,
    image : req.body.image,
    option : req.body.option
  }
  models.Idea.create(newidea).then(data => res.redirect('/ideas'))
})


router.get('/delete/:id', (req, res) => {
  models.Idea.destroy({where: {id: req.params.id}}).then(deleted => res.redirect('/ideas'))
})


module.exports = router;