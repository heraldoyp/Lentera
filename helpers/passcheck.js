const bcrypt = require('bcrypt');
const saltRounds = 10;
const models = require('../models');

module.exports =  function (req, res, next) {
  models.User.findOne({where: {username: req.body.username}})
  .then(data => {
    data ? req.body.id = data.id : next();
    return bcrypt.compare(req.body.password, data.password)
   })
      .then(condition => {
        if(condition) {
          req.body.login = true;
        } else {
          req.body.login = false;
        }
        next()
      })
}
