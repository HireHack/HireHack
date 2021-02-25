module.exports.candidateIsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
    next()
  } else {
      res.redirect('/candidate-login')
    }
}

module.exports.candidateIsNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/candidate-profile')
      next()
    } else {
      next()
    }
}

