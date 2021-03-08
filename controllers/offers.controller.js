const mongoose = require('mongoose');
const Offer = require('../models/offer.model');
const flash = require('connect-flash')

module.exports.offersList = (req, res, next) => {
    Offer.find()
        .populate('offers_publishedByCompany')
        .then((offers) => {
            //console.log('offers', offers);
            res.render('offers/offersList', {
                offers
            })
        })
        .catch((err) => console.error(err))
};

module.exports.offerDetail = (req, res, next) => {
    Offer.findById(req.params.id)
        .populate('offers_publishedByCompany')
        .then((offer) => {
            //console.log(offer.getAddress())
            res.render('offers/offerDetail', {
                offer /* addressDetail: offer.getAddress()*/
            })
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

    const offer = req.body;
    console.log('oferta', req.body)
    offer.offers_publishedByCompany = req.currentCompany.id
    //{offer, ...offer.offers_publishedByCompany}

    if (offer.skills) {
        offer.skills = offer.skills.split(',');
    }
    const company = req.currentCompany.id

    Offer.create(offer)
        .then((createdOffer) => {
            console.log('created offer: ', createdOffer)
            res.redirect('/company-profile');
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
    //Offer.find({'offers_publishedByCompany': req.currentCompany.id})
    Offer.findById(req.params.id)
        .then((offerToEdit) => {
            if (offerToEdit.offers_publishedByCompany == req.currentCompany.id) {
                res.render('offers/offerCreation', offerToEdit);
            } else {
                res.render('denied-route');
            }
        })
        .catch((err) => console.error(err));
}

module.exports.doEdit = (req, res, next) => {
    console.log("edit")
    Offer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((offerToEdit) => {
            if (offerToEdit.offers_publishedByCompany == req.currentCompany.id) {
                res.redirect('/company-profile')
            } else {
                res.render('denied-route');
            }
        })
        .catch((err) => {
            next(err)
        })
}

module.exports.delete = (req, res, next) => {
    Offer.findByIdAndDelete({
            _id: req.params.id /*offers_publishedByCompany: req.currentUser.id*/
        }) // To ensure only the creator can detele the offer
        .then(() => res.redirect('/company-profile'))
        .catch((err) => next(err));
}

module.exports.search = (req, res, next) => {
    if (req.query.address) {
        console.log('req.query', req.query)
        Offer.find( {$and:[{"active": true}, {"paid": true}]} )
            .populate('offers_publishedByCompany')
            .then((offers) => {
                console.log('offers', offers)
                const queryAddress = req.query.address.toLowerCase().slice(1)
                console.log('req.query.search', queryAddress)
                let filteredOffers = []
                offers.forEach((offer) => {
                    console.log('offer forEach', offer)
                    const cityOffer = offer.address
                    if (cityOffer.includes(queryAddress)) {
                        console.log('offerWithQueries', offer)
                        filteredOffers.push(offer);
                    }
                })
                console.log('filteredOffers', filteredOffers)
                return filteredOffers
            })
            .then((offers) => res.render('offers/offersList', {
                offers
            }))
    } else if (req.query.category) {
        Offer.find({
                category: req.query.category
            })
            .populate('offers_publishedByCompany')
            .then((offers) => {
                //console.log ('req.query.category', req.query.category)
                //console.log('offers', offers)
                res.render('offers/offersList', {
                    offers
                })
            })
    } else if (req.query.contract) {
        Offer.find({contract: req.query.contract})
            .populate('offers_publishedByCompany')
                .then((offers) => {
                    //console.log('offers', offers)
                    res.render('offers/offersList', {offers})
                })
    } else if (req.query.studies) {
        Offer.find({studies: req.query.studies})
        .populate('offers_publishedByCompany')
        .then((offers) => {
            //console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else if (req.query.experience) {
        Offer.find({experience: req.query.experience})
        .populate('offers_publishedByCompany')
        .then((offers) => {
            //console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else if (req.query.salary) {
        Offer.find({salary: req.query.salary})
        .populate('offers_publishedByCompany')
        .then((offers) => {
            //console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else {
        console.log('else search')
    }
}