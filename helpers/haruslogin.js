module.exports =  function (req, res, next) {
  if (req.session.logged) next();
  else {
    res.redirect('/user/login')
  }
}