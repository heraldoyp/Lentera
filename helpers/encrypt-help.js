const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports =  function (req, res, next) {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    req.body.password = hash;
    next();
  })
}
