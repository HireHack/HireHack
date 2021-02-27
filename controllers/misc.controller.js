const Company = require('../models/company.model');
const Candidate = require('../models/candidate.model');
const flash = require ('connect-flash');
const Offer = require('../models/offer.model');

module.exports.home = (req, res, next) => {
    res.render('home');
}

module.exports.search = (req, res, next) => {
    //console.log('req.body', req.body)
    //console.log('req.query', req.query)
    Offer.find({ "name": req.query.search })
        .then((offers) => {
            res.render('offers/offersList', {offers})
        })
}

module.exports.mainLogin = (req, res, next) => {
    res.render('main-login');
}