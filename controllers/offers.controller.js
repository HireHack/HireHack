const mongoose = require('mongoose')

const Candidate = require('../models/candidate.model');
const Company = require('../models/company.model');
const Offer = require('../models/offer.model');

module.exports.offersList = (req, res, next) => {
    Offer.find()
        .then((offers) => {
            res.render('offers/offersList', { offers })
        })
        .catch((err) => console.error(err))
};

module.exports.offerDetail = (req, res, next) => {
    Offer.findById(req.params.id)
        .then((offer) => {
            console.log('test')
            console.log(offer.getAddress())
            res.render('offers/offerDetail', { offer , prettyAddress: offer.getAddress()})

        })
};

module.exports.offerCreation = (req, res, next) => res.render('offers/offerCreation');