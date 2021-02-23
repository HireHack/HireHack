const mongoose = require('mongoose');
const Offer = require('../models/offer.model');

module.exports.offersList = (req, res, next) => {
    Offer.find()
        .then((offers) => {
            res.render('offers/offersList', {
                offers
            })
        })
        .catch((err) => console.error(err))
};

module.exports.offerDetail = (req, res, next) => {
    Offer.findById(req.params.id)
        .then((offer) => {
            console.log('test')
            console.log(offer.getAddress())
            res.render('offers/offerDetail', { offer, prettyAddress: offer.getAddress()})
        })
};

module.exports.offerCreation = (req, res, next) => res.render('offers/offerCreation');

module.exports.offerDoCreation = (req, res, next) => {
    function renderWithErrors(errors) {
        res.render('offers/offerCreation', {
            errors: errors,
            offer: req.body
        })
    }
    console.log('log req.body:', req.body)
    Offer.create(req.body)
        .then((createdOffer) => {
            console.log('created offer: ', createdOffer)
            res.redirect(`/offers-list, createdOffer)
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                renderWithErrors(err.errors)
            } else {
                next(err)
            }
        })
}