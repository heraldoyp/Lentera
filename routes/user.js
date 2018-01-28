var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('/', (req, res) => {
  res.send(`<center><h1>
  <ul>Create =<a href="/user/register"> Register</a><br></ul>
  <ul>Read (all) =<a href="/user/list">list</a><br></ul>
  <ul>Update = <a href="/user/list"> Edit (embed on list)</a><br></ul>
  <ul>Delete = <a href="/user/list"> Delete (embed on list)</a><br></ul>
  </center></h1>
  `)
})

router.get('/register', (req, res) => {
  res.render('createid.ejs')
})

router.post('/register', (req, res) => {
  let newuser = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  }
  models.User.create(newuser).then(output => res.send(`user ${output.username} has been created`))
})

router.get('/list', (req,res) => {
  models.User.findAll({order : [['id', 'ASC']]}).then(output => res.render('userlist.ejs', input = output))
})

router.get('/edit/:id', (req,res) => {
  models.User.findById(req.params.id).then(output => res.render('useredit.ejs', user = output))
})

router.post('/edit/:id', (req,res) => {
  let newdata = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  }
  models.User.update(newdata, {where : {id :req.params.id}}).then(output => res.redirect('/user/list'))
})

router.get('/delete/:id', (req,res) => {
  models.User.destroy({where: {id: req.params.id}}).then(deleted => res.redirect('/user/list'))
 })


module.exports = router;