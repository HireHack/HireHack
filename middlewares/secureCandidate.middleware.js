module.exports.candidateIsAuthenticated = (req, res, next) => {
  if (req.session.currentCandidateId) {
    next()
  } else {
    res.redirect('/candidate-login')
  }
}

module.exports.candidateIsNotAuthenticated = (req, res, next) => {
  if (req.session.currentCandidateId) {
    res.redirect('/candidate-profile')
  } else {
    next()
  }
}