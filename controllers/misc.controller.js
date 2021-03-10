const flash = require ('connect-flash');
const Offer = require('../models/offer.model');

module.exports.home = (req, res, next) => {
    res.render('home');
}

module.exports.search = (req, res, next) => {
    Offer.find({ 'name' : { '$regex' : req.query.search, '$options' : 'i' } })
        .then((offers) => res.render('offers/offersList', {offers}))
        .catch((err) => next(err));
}

module.exports.mainLogin = (req, res, next) => {
    res.render('main-login');
}

module.exports.passwordUpdateConfirmation = (req, res, next) => {
    res.send('Password Update Confirmation')
}
