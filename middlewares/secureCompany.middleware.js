module.exports.companyIsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      console.log(req.isAuthenticated())
    next()
  } else {
      res.redirect('/company-login')
    }
}

module.exports.companyIsNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/company-profile')
      next()
    } else {
      next()
    }
}