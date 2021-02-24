module.exports.candidateIsAuthenticated = (req, res, next) => {
  if (req.candidateIsAuthenticated) {
    next()
  } else {
    res.redirect('/candidate-login')
  }
}

module.exports.candidateIsNotAuthenticated = (req, res, next) => {
  if (req.candidateIsAuthenticated) {
    res.redirect('/candidate-profile')
  } else {
    next()
  }
}

