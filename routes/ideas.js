const express = require('express');
const router = express.Router();
const models = require('../models');
const progress = require('../helpers/progress.js')

router.get('/', (req, res) => {
  models.Idea.findAll({order : [['id', 'ASC']], include: [models.Perk]}).then(results => {
      let databaru = progress(results)
      // console.log(databaru[0])
      // res.send(databaru)
      res.render('ideas.ejs', {datas: databaru})

  })
    // res.send(result)) //Perks one-to-many relation testing
})

router.get('/view/:id', (req, res) => {
  // models.Idea.findById(req.params.id).then(data => res.render('ideasbyid.ejs', idea = data))
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data => 
    res.render('ideasbyid.ejs', {idea: data, perks: data.Perks})
    // res.send(data.Perks[0].items)
  )
  .catch(err =>{
    res.send(err);
  })
})

router.get('/edit/:id', (req, res) => {
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data => res.render('editidea.ejs', {idea: data, perks: data.Perks}))
  
  
})

router.post('/edit/:id', (req, res) => {
  let newdata = {
    overview : req.body.overview,
    image : req.body.image,
    title : req.body.title,
    total_funding: req.body.total_funding,
    goal_funding: req.body.goal_funding
  }
  models.Idea.update(newdata, {where: {id: req.params.id}})
  .then(data => res.redirect('/ideas'))
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
    title : req.body.title,
    total_funding: req.body.total_funding,
    goal_funding: req.body.goal_funding
  }
  models.Idea.create(newidea).then(data => res.redirect('/ideas'))
})


router.get('/delete/:id', (req, res) => {
  models.Idea.destroy({where: {id: req.params.id}}).then(deleted => res.redirect('/ideas'))
})


//Add Perks
router.get('/perks/:id', (req, res)=>{
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data=>{
    res.render('addperks.ejs', {idea: data, perks: data.Perk})
    // res.send(data.Perks[0].items);
  })
})

router.post('/perks/:id', (req, res)=>{
    let newdata = {
      title: req.body.title,
      amount_donated: req.body.amount_donated,
      items: req.body.items,
      IdeaId: req.params.id
    }
    models.Perk.create(newdata)
    .then(data=>{
      res.redirect('/ideas')
    })
    .catch(err=>{
      res.send(err)
    })
})


router.get('/perks/:id/edit', (req, res)=>{
  // res.send(req.params.id)
  models.Perk.findById(req.params.id)
  .then(data=>{
    res.render('editperks.ejs', {perk: data})  
  })
  .catch(err=>{
    res.send(err);
  })
  
})

router.post('/perks/:id/edit', (req, res)=>{
  let changedData = {
    title: req.body.title,
    amount_donated: req.body.amount_donated,
    items: req.body.items,
    IdeaId: req.body.IdeaId
  }

  models.Perk.update(changedData, {where: {id: req.params.id}})
  .then(data=>{
    res.send('perks data updated')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/perks/:id/delete', (req, res)=>{
  models.Perk.destroy({where: {id: req.params.id}})
  .then(data=>{
    res.send("data telah dihapus")
  })
  .catch(err=>{
    res.send(err)
  })
})



module.exports = router;