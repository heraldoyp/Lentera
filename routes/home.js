const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res)=>{
    models.Idea.findAll({order: [['id', 'ASC']]})
    .then(data=>{
        res.render('home.ejs', {data})
    })
    .catch(err=>{
        res.send(err)
    })
})

module.exports = router