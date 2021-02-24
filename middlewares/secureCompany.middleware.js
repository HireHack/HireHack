module.exports.companyIsAuthenticated = (req, res, next) => {
  if (req.companyIsAuthenticated) {
    next()
  } else {
    res.redirect('/company-login')
  }
}

module.exports.companyIsNotAuthenticated = (req, res, next) => {
  if (req.companyIsAuthenticated) {
    res.redirect('/company-profile')
  } else {
    next()
  }
}