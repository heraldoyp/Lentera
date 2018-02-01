module.exports =  function (req, res, next) {
  if (req.session.username === "admin") next();
  else {
    res.redirect('/')
  }
}