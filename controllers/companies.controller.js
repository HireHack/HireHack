const mongoose = require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const Company = require('../models/company.model');
const Offer = require('../models/offer.model');
const { sendCompanyActivationEmail } = require('../config/mailer.config');
const { sendDeleteCompanyEmail } = require('../config/mailer.config');
const { sendCompanyEmailUpdateEmail } = require('../config/mailer.config');
const { sendCompanyPasswordUpdateEmail } = require('../config/mailer.config');
const { v4: uuidv4 } = require('uuid');
const Application = require('../models/application.model');

module.exports.companyProfile = (req, res, next) => {
    Offer.find({'offers_publishedByCompany': req.currentCompany.id})
        .then(offers => {
            res.render('companies/companyProfile', { offers })
        })
    // console.log('req.user company', req.user) 
} 

module.exports.login = (req, res, next) => {
    // console.log('req.user login controller', req.user)
    res.render('companies/login')
};

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth-companies', (error, company, validations) => {
    if (error) {
      next(error);
    } else if (!company) {
      res.status(400).render('companies/login', { company: req.body, errors: validations.error });
    } else if (!company.active) {
        req.flash('flashMessage', 'Tu cuenta no ha sido verificada todavía. Por favor, ve a tu email para activarla');
        res.redirect('/company-login');
    } else {
      req.login(company, loginErr => {
          if (loginErr) {
              next(loginErr)
          } else {
            res.redirect('/company-profile')
          }
      })
    }
  })(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    passport.authenticate('google-auth-companies', (error, company, validations) => {
        if (error) {
            next(error)
        } else if (!company) {
            res.status(400).render('companies/login', {company: req.body, errors: validations.error})
        } else {
            req.login(company, (loginErr) => {
                if (!loginErr) {
                    res.redirect('/company-profile')
                    
                } else {
                    next(loginErr)
                }
            })
        }
    })(req, res, next)
}

module.exports.signup = (req, res, next) => res.render('companies/signup');

module.exports.doSignup = (req, res, next) => {
    console.log('req.body signup', req.body)

    function renderWithErrors(errors) {
        console.log(errors)
        res.status(400).render('companies/signup', {
            errors: errors,
            company: req.body
        })
        console.log('req.body signup', req.body)
    }
    
    Company.findOne({ email: req.body.email })
        .then((company) => {
            if (company) {
                renderWithErrors({
                    email: "Ya existe un usuario con este email"
                })
            } else {
                Company.create(req.body)
                    .then((createdCompany) => {
                        req.flash('flashMessage', '¡Perfil creado con éxito! - Por favor, ve a tu email para finalizar el registro')
                        sendCompanyActivationEmail(createdCompany.email, createdCompany.token);
                        res.redirect('/company-login')
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
    Company.findOneAndUpdate (
        { token: req.params.token, active: false },
        { active: true, token: uuidv4() }
    )
        .then((company) => {
            if(company) {
                //company.generateToken();
                req.flash('flashMessage', 'Tu cuenta ha sido activada - ¡Ya puedes iniciar sesión!');
                res.redirect('/company-login');
            } else {
                req.flash('flashMessage', 'Error al activar tu cuenta, por favor, inténtalo de nuevo.');
                res.redirect('/company-signup');
            }
        })
        .catch((err) => next(err));
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

module.exports.edit = (req, res, next) => {
    //console.log('req.currentCompany', req.currentCompany)
     Company.findById({_id: req.currentCompany.id})
         .then((companyToEdit) => res.render('companies/signup', companyToEdit))
         .catch((err) => next(err))
}

module.exports.doEdit = (req, res, next) => {

    if (req.file) {
        req.body.picture = req.file.path
    }

    Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => { res.redirect('/company-profile') })
        .catch((err) => next(err))
}

module.exports.updateEmail = (req, res, next) => {
    Company.findById({_id: req.currentCompany.id})
        .then((companyToUpdate) => {
            //console.log('candidateToDelete', candidateToDelete)
            req.flash('flashMessage', 'Solicitud de actualización de email realizada correctamente - Por favor, ve a tu email para confirmar el cambio');
            sendCompanyEmailUpdateEmail(companyToUpdate.email, companyToUpdate.token);
            res.redirect('/company-profile');
        })
        .catch((err) => next(err));
}

module.exports.editEmail = (req, res, next) => res.render('companies/newEmailForm');

module.exports.doEditEmail = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('companies/newEmailForm', {
            errors: errors,
            company: req.body
        })
    }
    
    if (req.body.newEmail != req.body.confirmEmail) {
        renderWithErrors({
            confirmEmail: "Los emails no coindiden."
        })
    } else if (req.body.newEmail == '' || req.body.confirmEmail == '') {
        renderWithErrors({
            email: "Los campos no deben estar vacíos."
        })
    } else if (req.body.newEmail == req.currentCompany.email) {
        renderWithErrors({
            email: 'Este email ya ha sido utilizado.'
        })
    } else {
        Company.findOneAndUpdate({
                _id: req.currentCompany.id,
            }, {
                email: req.body.newEmail,
                token: uuidv4()
            })
            .then(() => {
                req.flash('flashMessage', '¡Tu email ha sido actualizado con éxito!');
                res.redirect('/company-profile');
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
    Company.findById({_id: req.currentCompany.id})
        .then((companyToUpdate) => {
            req.flash('flashMessage', 'Solicitud de actualización de contraseña realizada correctamente - Por favor, ve a tu email para confirmar el cambio');
            sendCompanyPasswordUpdateEmail(companyToUpdate.email, companyToUpdate.token);
            res.redirect('/company-profile');
        })
        .catch((err) => next(err));
}

module.exports.editPassword = (req, res, next) => res.render('companies/newPasswordForm');

module.exports.doEditPassword = (req, res, next) => {

    function renderWithErrors(errors) {
        res.status(400).render('companies/newPasswordForm', {
            errors: errors,
            company: req.body
        })
    }
    
    Company.findById(req.currentCompany.id)
        .then((company) => {
            return company.checkPassword(req.body.newPassword)
                .then(match => {
                    if (!match) {
                        if (req.body.newPassword !== req.body.confirmPassword) {
                            renderWithErrors({
                                confirmPassword: "Las contraseñas no coinciden."
                            })
                        } else if (req.body.newPassword == '' || req.body.confirmPassword == '') {
                            renderWithErrors({
                                password: "Los campos no deben estar vacíos."
                            })
                        } else {
                            company.password = req.body.newPassword;
                            company.token = uuidv4();
                            return company.save()
                                .then(() => {
                                    req.flash('flashMessage', '¡Tu contraseña ha sido actualizada correctamente!');
                                    res.redirect('/company-profile')
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
    Company.findById({_id: req.currentCompany.id})
        .then((companyToDelete) => {
            req.flash('flashMessage', 'Solicitud de baja realizada correctamente - Por favor, ve a tu email para finalizar el proceso');
            sendDeleteCompanyEmail(companyToDelete.email, companyToDelete.token);
            res.redirect('/');
        })
        .catch((err) => next(err));
}


module.exports.doDelete = (req, res, next) => {
    Company.findOne({ token: req.params.token })
        .then((company) => {
            console.log('company 1st then', company)
            Offer.find({ offers_publishedByCompany: company.id })
                .then((offers) => {
                    console.log('offers', offers)
                    offers.forEach(offer => {
                        offer.active = false
                        offer.save()   
                    })

                    Company.findByIdAndDelete(company.id)
                    .then(() => {
                        console.log('Empresa borrada')
                        res.redirect('/')
                    })
                }) 
                .catch((e) => next(e)) 
        // return company   
        })
        // .then((company => {
        //     console.log('company 2nd then', company)
        //     Company.findByIdAndDelete(company.id)
        //         .then(() => {
        //             console.log('Empresa borrada')
        //             res.redirect('/')
        //         })
        // }))
        .catch((e)=> next(e))
}

// module.exports.doDelete = (req, res, next) => {
//     Company.findOneAndRemove({token: req.params.token})
//         .then(() => {
//             req.flash('flashMessage', 'Tu cuenta ha sido borrada correctamente');
//             res.redirect('/');
//         })
//         .catch((err) => next(err));
// }