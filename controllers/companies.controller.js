const mongoose = require('mongoose')
const Company = require('../models/company.model');
const Offer = require('../models/offer.model');

module.exports.companyProfile = (req, res, next) => res.render('companies/companyProfile')

module.exports.login = (req, res, next) => res.render('companies/login');

module.exports.doLogin = (req, res, next) => {
    function renderWithErrors(errors) {
        res.render('companies/login', {
            company: req.body,
            errors: 'El correo o la contraseña no son correctos'
        })
    }
    Company.findOne({
            email: req.body.email
        })
        .then((company) => {
            if (!company) {
                renderWithErrors();
            } else {
                company.checkPassword(req.body.password)
                    .then((match) => {
                        if (match) {
                            req.session.currentCompanyId = company.id;
                            res.redirect('/company-profile');
                        } else {
                            renderWithErrors();
                        }
                    })
            }
        })
        .catch(err => next(err));
}

module.exports.signup = (req, res, next) => res.render('companies/signup');


module.exports.doSignup = (req, res, next) => {
    function renderWithErrors(errors) {
        res.status(400).render('companies/signup', {
            errors: errors,
            company: req.body
        })
    }
    Company.findOne({
            email: req.body.email
        })
        .then((company) => {
            if (company) {
                renderWithErrors({
                    email: "Ya existe un usuario con este email"
                })
            } else {
                Company.create(req.body)
                    .then(() => {
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


module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}

module.exports.delete = (req, res, next) => {
    console.log(req.params.id)
    Company.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/'))
        .catch((err) => next(err));
}