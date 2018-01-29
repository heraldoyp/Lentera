var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
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
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    let newuser = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      username : req.body.username,
      password : hash,
    }
    return newuser
  })
    .then(newuser => models.User.create(newuser)
      .then(output => res.send(`user ${output.username} has been created`)))

  .catch(err=>{
    res.send(err)
  })
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


 // Login & SignUp
//  router.get('/signUp', (req, res)=>{
//   res.render('signup')
//  })
//  router.post('/signUp', (req, res)=>{
  
//  })

router.get('/login', (req, res)=>{
  res.render('login')
})

router.post('/login',  (req, res)=>{

    models.User.findOne({where: {username: req.body.username}})
    .then(data =>{
      // res.send( ddata.password);
      bcrypt.compare(req.body.password, data.password).then(condition => {
        // return res.send(condition);
        if(condition){
          res.send("login berhasil")
        }else{
          res.send("login gagal")
        }
      });
    
    })
    .catch(err=>{
      res.send(err);
    })
}) 

module.exports = router;