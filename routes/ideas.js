const express = require('express');
const router = express.Router();
const models = require('../models');
const progress = require('../helpers/progress.js')
const api_key = 'key-7f663c7fad5ee49dd36fa41cd5714894';
const domain = 'sandboxddff3e8a92d349d1bf5e32d78e253677.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const admin = require('../helpers/adminaccess.js')
const login = require('../helpers/haruslogin.js')
const access = require('../helpers/access.js')



router.get('/', login, (req, res) => {
  models.Idea.findAll({order : [['id', 'ASC']], include: [models.Perk]}).then(results => {
      res.render('ideas.ejs', {datas: results})
  }) 
})

router.get('/view/:id', login, (req, res) => {
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data => 
    res.render('ideasbyid.ejs', {idea: data, perks: data.Perks}))
  .catch(err =>{
    res.send(err);})
})


router.get('/edit/:id', access, (req, res) => {
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data => res.render('editidea.ejs', {idea: data, perks: data.Perks}))  
})

router.post('/edit/:id', access, (req, res) => {
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

router.get('/create', login, (req, res) => {
  res.render('createideas.ejs')
})

router.post('/create', login, (req, res) => {
  let newidea = {
    overview : req.body.overview,
    image : req.body.image,
    title : req.body.title,
    total_funding: req.body.total_funding,
    goal_funding: req.body.goal_funding
  }
  models.Idea.create(newidea).then(data => res.redirect('/ideas'))
})


router.get('/delete/:id', login, (req, res) => {
  models.Idea.destroy({where: {id: req.params.id}}).then(deleted => res.redirect('/ideas'))
})


//Add Perks
router.get('/perks/:id', login, (req, res)=>{
  models.Idea.findById(req.params.id, {include: [models.Perk]})
  .then(data=>{
    res.render('addperks.ejs', {idea: data, perks: data.Perk})
  })
})

router.post('/perks/:id', login, (req, res)=>{
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


router.get('/perks/:id/edit', admin, (req, res)=>{
  // res.send(req.params.id)
  models.Perk.findById(req.params.id)
  .then(data=>{
    res.render('editperks.ejs', {perk: data})  
  })
  .catch(err=>{
    res.send(err);
  })
  
})

router.post('/perks/:id/edit', admin, (req, res)=>{
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

router.get('/perks/:id/delete', admin, (req, res)=>{
  models.Perk.destroy({where: {id: req.params.id}})
  .then(data=>{
    res.send("data telah dihapus")
  })
  .catch(err=>{
    res.send(err)
  })
})


router.get('/view/:idIdea/:idPerk/approve', login, (req, res)=>{
    models.Idea.findOne({include: [models.Perk], where: {id: req.params.idIdea}})
    .then(dataIdea=>{
      models.Perk.findOne({where: {id: req.params.idPerk}})
      .then(dataPerk=>{
        models.User.findOne({where: {id: req.session.userid}})
        .then(dataUser=>{
          res.render('approve', {idea: dataIdea, perk: dataPerk, user: dataUser})
        })
      })
    })
    .catch(err => res.send(err));
})

router.post('/view/:idIdea/:idPerk/approve', login, (req, res)=>{
  let obj = {
    UserId: req.session.userid,
    IdeaId: req.params.idIdea,
    invoice: req.body.donation
  }
  models.UserIdea.create(obj)
  .then(datas=>{
    var data = {
      from: 'Lentera <lentera@mail.com>',
      to: 'heraldoyusrontris@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!'
    };
     
    mailgun.messages().send(data, function (error, body) {
      if(!error){
        console.log(data)
        console.log(body)
        console.log("success")
      }else{
        console.log("email not sent")
      }
    });
  })
  .catch(err=>{
    res.send(err)
  })
})


router.get('/cek', login, (req, res) => {
  models.Idea.findAll({include: [models.User]})
  .then(data => res.send(data))
  
})

module.exports = router;