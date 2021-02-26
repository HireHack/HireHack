const Company = require('../models/company.model');
const Candidate = require('../models/candidate.model');
const flash = require ('connect-flash')

module.exports.home = (req, res, next) => {
    req.flash('flashMessage','¡página principal!')
    res.render('home');
}

module.exports.mainLogin = (req, res, next) => {
    res.render('main-login');
}