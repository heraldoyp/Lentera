module.exports =  function (req, res, next) {
  if (req.session.userid === req.params.id || req.session.username === "admin") next();
  else {
    res.redirect('/')
  }
}