const express = require('express');
const router = express.Router();
const encryptpass = require('../helpers/encrypt-help')
const passcheck = require('../helpers/passcheck')
const models = require('../models');


router.get('/', (req, res) => {
  res.send(`
  <center><h1>
  <ul>Create =<a href="/user/register"> Register</a><br></ul>
  <ul>Read (all) =<a href="/user/list">list</a><br></ul>
  <ul>Update = <a href="/user/list"> Edit (embed on list)</a><br></ul>
  <ul>Delete = <a href="/user/list"> Delete (embed on list)</a><br></ul>
  </center></h1>
  `)
})

//CREATE 

router.get('/register', (req, res) => {

  if(req.session.logged !== true || req.session.username === 'admin') res.render('createid.ejs');
  else res.send('you are logged in already!')

})


router.post('/register', (req, res) => {
  let newuser = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    username : req.body.username,
    password : req.body.password
  }

  models.User.create(newuser)
  .then(output => res.send(`user ${output.username} has been created`))
  .catch(err => res.send(err))

})

//READ

router.get('/list', (req,res) => {

  if (req.session.username === "admin") {
    models.User.findAll({order : [['id', 'ASC']]})
    .then(output => res.render('userlist.ejs', input = output))
  } else {
    res.send('Page ini hanya bisa diakses oleh admin!')
  }

})

//UPDATE

router.get('/edit/:id', (req,res) => {
  console.log(req.session.userid)
  console.log(req.params.id)
  if (req.session.username === "admin" || req.session.userid == req.params.id) {
    models.User.findById(req.params.id)
    .then(output => res.render('useredit.ejs', user = output))
  } else {
    res.send('Page ini hanya bisa diakses oleh admin! / yang memiliki id!')
  }

})

router.post('/edit/:id', (req,res) => {

  if (req.session.username === "admin" || req.session.userid === req.params.id) {

  let newdata = {
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : req.body.password
  } 
    models.User.update(newdata, {where : {id :req.params.id}})
    .then(output => res.redirect('/user/list'))
  } else {
    res.send('Page ini hanya bisa diakses oleh admin! / user!')
  }
})

//DELETE

router.get('/delete/:id', (req,res) => {

  if (req.session.username === "admin"){
    models.User.destroy({where: {id: req.params.id}})
    .then(deleted => res.redirect('/user/list'))
  } else {
    res.send('Page ini hanya bisa diakses oleh admin!')
  }

 })

// LOGINS and LOGOUT
router.get('/login', (req, res)=>{
  if(req.session.logged) {
    res.send('Kamu sudah login')
  } else {
    res.render('login')
  }
})

router.post('/login', passcheck, (req, res)=>{

  if (req.body.login === true) {

    req.session.username = req.body.username;
    req.session.userid = req.body.id;
    req.session.logged = true;

    res.redirect('/ideas')
    // res.send(`login ${req.session.username} <br> user id:${req.session.userid} berhasil`)
  } else {
    res.send("login gagal")
  }
})

router.get('/logout', (req,res) => {
  
  req.session.username = null;
  req.session.userid = null;
  req.session.logged = false;
  
  res.redirect('/ideas')

})

// SESSION CHECK

router.get('/sess', (req,res) => {
  let username = req.session.username;
  let id = req.session.userid;
  res.send(id + username)
})

module.exports = router;