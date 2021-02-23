const mongoose = require('mongoose');
const Candidate = require('../models/candidate.model');
const Company = require('../models/company.model');
const Offer = require('../models/offer.model');

module.exports.candidateProfile = (req, res, next) => res.render('candidates/candidateProfile');

module.exports.login = (req, res, next) => res.render('candidates/login');

module.exports.doLogin = (req, res, next) => {
    
}

module.exports.signup = (req, res, next) => res.render('candidates/signup');

module.exports.doSignup = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('candidates/signup', {
            errors: errors,
            candidate: req.body
        })
    }
    Candidate.findOne({ email: req.body.email })
        .then((candidate) => {
            if (candidate) {
                renderWithErrors({email: "Ya existe un usuario con este email"})
            } else {
                Candidate.create(req.body)
                    .then(() => {
                    res.redirect ('/candidate-profile')
                    })
                    .catch((err) => {
                        if (err instanceof mongoose.Error.ValidationError) {
                            renderWithErrors(err.errors)
                        } else {
                            next (err)
                        }
                    })
            }
        })
        .catch((err) => next(err));
}


module.exports.logout = (req, res, next) => {

}
