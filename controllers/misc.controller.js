const Company = require('../models/company.model');
const Candidate = require('../models/candidate.model');
const flash = require('connect-flash');
const Offer = require('../models/offer.model');

module.exports.home = (req, res, next) => {
    res.render('home');
}

module.exports.search = (req, res, next) => {
    //console.log('req.body', req.body)
    Offer.find({$and:[{"active": true}, {"paid": true}]})
        .populate('offers_publishedByCompany')
        .then((offers) => {
            const queryContent = req.query.search.toLowerCase().slice(1)
            //console.log('req.query.search', queryContent)
            let filteredOffers = []
            offers.forEach((offer) => {
                //console.log(offer.name)
                const nameOffer = offer.name
                if (nameOffer.includes(queryContent)) {
                    //console.log('offerWithQueries',offer) 
                    filteredOffers.push(offer);
                }
            })
            //console.log('filteredOffers', filteredOffers)
            return filteredOffers
        })
        .then((offers) => res.render('offers/offersList', {
            offers
        }))
}

module.exports.mainLogin = (req, res, next) => {
    res.render('main-login');
}

