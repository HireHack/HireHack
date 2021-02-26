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
            //console.log(offer.getAddress())
            res.render('offers/offerDetail', { offer /* addressDetail: offer.getAddress()*/})
        })
};


module.exports.create = (req, res, next) => res.render('offers/offerCreation');

module.exports.doCreate = (req, res, next) => {
    function renderWithErrors(errors) {
        res.render('offers/offerCreation', {
            errors: errors,
            offer: req.body
        })
    }

    const offer = req.body
    if (offer.skills) {
        offer.skills = offer.skills.split(',');
    }

    Offer.create(offer)
        .then((createdOffer) => {
            console.log('created offer: ', createdOffer)
            res.redirect('/offers-list');
            // TODO: Push new offer to the top of the list and add an animation (blink + color) for 3-4 seconds
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                console.log('catch created offer', err)
                renderWithErrors(err.errors)
            } else {
                console.log('next created offer')
                next(err)
            }
        })
}

module.exports.edit = (req, res, next) => {
    Offer.findById(req.params.id)
        .then((offerToEdit) => res.render('offers/offerCreation', offerToEdit))
        .catch((err) => console.error(err))
}


module.exports.doEdit = (req, res, next) => {

}

module.exports.delete = (req, res, next) => {
    Offer.findByIdAndDelete({_id: req.params.id /*offers_publishedByCompany: req.currentUser.id*/}) // To ensure only the creator can detele the offer
        .then(() => res.redirect('/offers-list'))
        .catch((err) => next(err));
}