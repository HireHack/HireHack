const mongoose = require('mongoose');
const passport = require('passport');
const Candidate = require('../models/candidate.model');
const Offer = require('../models/offer.model');
const Application = require('../models/application.model');
const { sendActivationEmail } = require('../config/mailer.config');

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
            next(error);
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
    Candidate.findOne({ email: req.body.email })
        .then((candidate) => {
            if (candidate) {
                renderWithErrors({
                    email: "Ya existe un usuario con este email"
                })
            } else {
                Candidate.create(req.body)
                    .then((createdCandidate) => {
                        req.flash('flashMessage', '¡Perfil creado con éxito! - Por favor, ve a tu email para finalizar el registro')
                        sendActivationEmail(createdCandidate.email, createdCandidate.activationToken);
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

module.exports.activate = (req, res, next) => {
    Candidate.findOneAndUpdate (
        { activationToken: req.params.token, active: false },
        { active: true, activationToken: "active"}
    )
        .then((candidate) => {
            if(candidate) {
                req.flash('flashMessage', 'Tu cuenta ha sido activada - ¡Ya puedes iniciar sesión!');
                res.redirect('/candidate-login');
            } else {
                req.flash('flashMessage', 'Error al activar tu cuenta, por favor, inténtalo de nuevo.');
                res.render('candidates/signup');
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

    if (req.files.picture) {
        req.body.picture = req.files.picture[0].path
    }

    if (req.files.cv) {
        req.body.cv = req.files.cv[0].path + '.jpg'
    }

    //console.log('req.body', req.body)
    //console.log('req.files', req.files)
    //console.log('req.files[picture][0]', req.files.picture[0].path)
    //console.log('req.files[cv]', req.files.cv[0].path)

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