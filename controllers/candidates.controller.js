const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const Candidate = require('../models/candidate.model');
const Offer = require('../models/offer.model');
const Application = require('../models/application.model');
const {
    sendCandidateActivationEmail
} = require('../config/mailer.config');
const {
    sendDeleteCandidateEmail
} = require('../config/mailer.config');
const {
    sendCandidateEmailUpdateEmail
} = require('../config/mailer.config');
const {
    sendCandidatePasswordUpdateEmail
} = require('../config/mailer.config');
const {
    v4: uuidv4
} = require('uuid');

module.exports.candidateProfile = (req, res, next) => {
    Application.find({
            'candidate': req.currentCandidate.id
        })
        .populate('offer')
        .then((application) => {
            res.render('candidates/candidateProfile', {
                application
            })
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
        } else if (!candidate.active) {
            req.flash('flashMessage', 'Tu cuenta no ha sido verificada todavía. Por favor, ve a tu email para activarla');
            res.redirect('/candidate-login');
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
                    .then((createdCandidate) => {
                        req.flash('flashMessage', '¡Perfil creado con éxito! - Por favor, ve a tu email para finalizar el registro')
                        sendCandidateActivationEmail(createdCandidate.email, createdCandidate.token);
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
    Candidate.findOneAndUpdate({
            token: req.params.token,
            active: false
        }, {
            active: true,
            token: uuidv4()
        })
        .then((candidate) => {
            if (candidate) {
                //candidate.generateToken();
                req.flash('flashMessage', 'Tu cuenta ha sido activada - ¡Ya puedes iniciar sesión!');
                res.redirect('/candidate-login');
            } else {
                req.flash('flashMessage', 'Error al activar tu cuenta, por favor, inténtalo de nuevo.');
                res.redirect('/candidate-signup');
            }
        })
        .catch((err) => next(err));
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

module.exports.edit = (req, res, next) => {
    const candidate = req.body;

    if (candidate.skills) {
        candiate.skills = candidate.skills.split(',');
    }

    Candidate.findById({
            _id: req.currentCandidate.id
        })
        .then((candidateToEdit) => res.render('candidates/signup', candidateToEdit))
        .catch((err) => next(err))

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
        .then(() => res.redirect('/candidate-profile'))
        .catch((err) => next(err))

}

module.exports.updateEmail = (req, res, next) => {
    console.log('curr candidate updateEmail', req.currentCandidate)
    Candidate.findById({
            _id: req.currentCandidate.id
        })
        .then((candidateToUpdate) => {
            //console.log('candidateToDelete', candidateToDelete)
            req.flash('flashMessage', 'Solicitud de actualización de email realizada correctamente - Por favor, ve a tu email para confirmar el cambio');
            sendCandidateEmailUpdateEmail(candidateToUpdate.email, candidateToUpdate.token);
            res.redirect('/candidate-profile');
        })
        .catch((err) => next(err));
}

module.exports.editEmail = (req, res, next) => res.render('candidates/newEmailForm');

module.exports.doEditEmail = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('candidates/newEmailForm', {
            errors: errors,
            candidate: req.body
        })
    }

    if (req.body.newEmail != req.body.confirmEmail) {
        console.log('¡Los emails no coinciden!')
        renderWithErrors({
            confirmEmail: "Los emails no coindiden."
        })
    } else if (req.body.newEmail == '' || req.body.confirmEmail == '') {
        renderWithErrors({
            email: "Los campos no deben estar vacíos."
        })
    } else if (req.body.newEmail == req.currentCandidate.email) {
        console.log('¡Error, por favor intentalo de nuevo!')
        renderWithErrors({
            email: 'Este email ya ha sido utilizado.'
        })
    } else {
        Candidate.findOneAndUpdate({
                _id: req.currentCandidate.id,
            }, {
                email: req.body.newEmail,
                token: uuidv4()
            })
            .then(() => {
                req.flash('flashMessage', '¡Tu email ha sido actualizado con éxito!');
                res.redirect('/candidate-profile');
            })
            .catch((err) => {
                if (err instanceof mongoose.Error.ValidationError) {
                    renderWithErrors()
                } else {
                    next(err)
                }
            });
    }
}

module.exports.updatePassword = (req, res, next) => {
    Candidate.findById({
            _id: req.currentCandidate.id
        })
        .then((candidateToUpdate) => {
            //console.log('candidateToDelete', candidateToDelete)
            req.flash('flashMessage', 'Solicitud de actualización de contraseña realizada correctamente - Por favor, ve a tu email para confirmar el cambio');
            sendCandidatePasswordUpdateEmail(candidateToUpdate.email, candidateToUpdate.token);
            res.redirect('/candidate-profile');
        })
        .catch((err) => next(err));
}

module.exports.editPassword = (req, res, next) => {
    Candidate.findOne({
            token: req.params.token
        })
        .then((candidate) => {
            res.render('candidates/newPasswordForm', {
                candidate
            })
        })
        .catch((err) => next(err));
};

module.exports.doEditPassword = (req, res, next) => {
    //console.log('doEditPassword candidate', candidate)
    //console.log('req.currentCandidate doEditPassword', req.currentCandidate)

    function renderWithErrors(errors) {
        res.status(400).render('candidates/newPasswordForm', {
            errors: errors,
            candidate: req.body
        })
    }

    Candidate.findById(req.currentCandidate.id)
        .then((candidate) => {
            console.log('candidate', candidate)
            return candidate.checkPassword(req.body.newPassword)
                .then(match => {
                    console.log('candidate match')
                    if (!match) {
                        console.log('candidate pw !match')
                        // TODO --> Separar validación confirmar contraseña
                        if (req.body.newPassword !== req.body.confirmPassword) {
                            console.log('¡Las contraseñas no coinciden!')
                            renderWithErrors({
                                confirmPassword: "Las contraseñas no coinciden."
                            })
                        } else if (req.body.newPassword == '' || req.body.confirmPassword == '') {
                            renderWithErrors({
                                password: "Los campos no deben estar vacíos."
                            })
                        } else {
                            console.log('candidate pw !match else')
                            candidate.password = req.body.newPassword;
                            candidate.token = uuidv4();
                            return candidate.save()
                                .then(() => {
                                    req.flash('flashMessage', '¡Tu contraseña ha sido actualizada correctamente!');
                                    res.redirect('/candidate-profile')
                                })
                        }
                    } else {
                        console.log('¡Error, por favor intentalo de nuevo!')
                        renderWithErrors({
                            password: "Esa contraseña ya ha sido utilizada"
                        })
                    }
                })
                .catch((err) => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        renderWithErrors(err.errors)
                    } else {
                        next(err)
                    }
                })
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                renderWithErrors(err.errors) // Not rendering errors
            } else {
                next(err)
            }
        });
}

module.exports.delete = (req, res, next) => {
    Candidate.findById({
            _id: req.currentCandidate.id
        })
        .then((candidateToDelete) => {
            req.flash('flashMessage', 'Solicitud de baja realizada correctamente - Por favor, ve a tu email para finalizar el proceso');
            sendDeleteCandidateEmail(candidateToDelete.email, candidateToDelete.token);
            res.redirect('/');
        })
        .catch((err) => next(err));
}

module.exports.doDelete = (req, res, next) => {
    Candidate.findOneAndRemove({
            token: req.params.token
        })
        .then(() => {
            req.flash('flashMessage', 'Tu cuenta ha sido borrada correctamente');
            res.redirect('/');
        })
        .catch((err) => next(err));
}