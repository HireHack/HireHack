const mongoose = require('mongoose');
const passport = require('passport');
const Candidate = require('../models/candidate.model');
const Offer = require('../models/offer.model');
const Application = require('../models/application.model');

module.exports.candidateProfile = (req, res, next) => {
    Application.find({'candidate': req.currentCandidate.id})
        .populate('offer')
        .then((application) => {
            res.render('candidates/candidateProfile', { application })
        })
}

module.exports.login = (req, res, next) => res.render('candidates/login');

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth-candidates', (error, candidate, validations) => {
        if (error) {
            next(error);
        } else if (!candidate) {
            res.status(400).render('candidates/login', {
                candidate: req.body,
                error: validations.error
            });
        } else {
            req.login(candidate, loginErr => {
                if (loginErr) next(loginErr)
                else res.redirect('/candidate-profile')
            })
        }
    })(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    passport.authenticate('google-auth-candidates', (error, candidate, validations) => {
        if (error) {
            next(error)
        } else if (!candidate) {
            res.status(400).render('candidates/login', {
                candidate: req.body,
                errors: validations.error
            })
        } else {
            req.login(candidate, (loginErr) => {
                if (!loginErr) {
                    res.redirect('/candidate-profile')

                } else {
                    next(loginErr)
                }
            })
        }
    })(req, res, next)
}

// module.exports.doLoginLinkedin = (req, res, next) => {
//     passport.authenticate('linkedin-auth-candidates', (error, candidate, validations) => {
//         if (error) {
//             next(error)
//         } else if (!candidate) {
//             res.status(400).render('candidates/login', {candidate: req.body, errors: validations.error})
//         } else {
//             req.login(candidate, (loginErr) => {
//                 if (!loginErr) {
//                     res.redirect('/candidate-profile')

//                 } else {
//                     next(loginErr)
//                 }
//             })
//         }
//     })(req, res, next)
// }

module.exports.signup = (req, res, next) => res.render('candidates/signup');

module.exports.doSignup = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('candidates/signup', {
            errors: errors,
            candidate: req.body
        })
    }
    console.log('createdUser req.body: ', req.body)
    Candidate.findOne({
            email: req.body.email
        })
        .then((candidate) => {
            if (candidate) {
                renderWithErrors({
                    email: "Ya existe un usuario con este email"
                })
            } else {
                Candidate.create(req.body)
                    .then(() => {
                        req.flash('flashMessage', '¡Perfil creado con éxito!')
                        res.redirect('/candidate-login')
                    })
                    .catch((err) => {
                        if (err instanceof mongoose.Error.ValidationError) {
                            renderWithErrors(err.errors)
                        } else {
                            next(err)
                        }
                    })
            }
        })
        .catch((err) => next(err));
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}


module.exports.edit = (req, res, next) => {
    const candidate = req.body
    if (candidate.skills) {
        candiate.skills = candidate.skills.split(',');
    }

    Candidate.findById(req.params.id)
        .then((candidateToEdit) => res.render('candidates/signup', candidateToEdit))
        .catch((err) => console.error(err))
}

module.exports.doEdit = (req, res, next) => {
    Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(() => {
            res.redirect('/candidate-profile')
        })
        .catch((err) => next(err))
}


module.exports.delete = (req, res, next) => {
    Candidate.findByIdAndDelete({
            _id: req.params.id
        })
        .then(() => res.redirect('/'))
        .catch((err) => next(err));
}