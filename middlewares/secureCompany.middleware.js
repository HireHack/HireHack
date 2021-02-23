module.exports.companyIsAuthenticated = (req, res, next) => {
  if (req.session.currentCompanyId) {
    next()
  } else {
    res.redirect('/company-login')
  }
}

module.exports.companyIsNotAuthenticated = (req, res, next) => {
  if (req.session.currentCompanyId) {
    res.redirect('/company-profile')
  } else {
    next()
  }
}