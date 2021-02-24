const mongoose = require('mongoose')
const passport = require('passport')
const Company = require('../models/company.model');
const Offer = require('../models/offer.model');

module.exports.companyProfile = (req, res, next) => res.render('companies/companyProfile')

module.exports.login = (req, res, next) => res.render('companies/login');

module.exports.doLogin = (req, res, next) => {
    passport.authenticate('local-auth-companies', (error, company, validations) => {
    if (error) {
      next(error);
    } else if (!company) {
      res.status(400).render('companies/login', { company: req.body, errors: validations.error });
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
    function renderWithErrors(errors) {
        res.status(400).render('companies/signup', {
            errors: errors,
            company: req.body
        })
    }
    Company.findOne({ email: req.body.email })
        .then((company) => {
            if (company) {
                renderWithErrors({email: "Ya existe un usuario con este email"})
            } else {
                Company.create(req.body)
                    .then(() => {
                    res.redirect ('/company-login')
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
    req.logout();
    res.redirect('/');
}