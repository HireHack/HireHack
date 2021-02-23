// const passport = require('passport');
// const mongoose = require('mongoose');

// const Company = require('../models/company.model');

// const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// passport.serializeCompany ((company, next) => {
//     next(null, company.id);
// })

// passport.deserializeCompany ((id, next) => {
//     company.findById(id)
//         .then((company) => next(null, company))
//         .catch(next);
// })