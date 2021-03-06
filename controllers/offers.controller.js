const mongoose = require('mongoose');
const Offer = require('../models/offer.model');
const Application = require('../models/application.model');
const flash = require ('connect-flash');

module.exports.offersList = (req, res, next) => {
    Offer.find({"active": true})
        .populate('offers_publishedByCompany')
        .then((offers) => {
            res.render('offers/offersList', { offers })
        })
        .catch((err) => next(err))
};

module.exports.offerDetail = (req, res, next) => {
    Offer.findById(req.params.id)
        .populate('offers_publishedByCompany')
        .then((offer) => {
            console.log('offerDetil', offer)
            res.render('offers/offerDetail', {
                offer,
                lat: offer.location.coordinates[1],
                lng: offer.location.coordinates[0]
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

    req.body.location = {
        type: 'Point',
        coordinates: [Number(req.body.lng), Number(req.body.lat)]
    }

    const offer = req.body;
    //console.log('oferta', req.body)
    offer.offers_publishedByCompany = req.currentCompany.id
    //{offer, ...offer.offers_publishedByCompany}
    
    if (offer.skills) {
        offer.skills = offer.skills.split(',');
    }
    const company = req.currentCompany.id
    
    Offer.create(offer)
    .then((createdOffer) => {
        createdOffer.status = "Proceso abierto"
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
            //console.log("I'm here")
            console.log(offerToEdit)
            if (offerToEdit.offers_publishedByCompany == req.currentCompany.id) {
                // res.render('offers/offerCreation', offerToEdit);
                console.log('if', offerToEdit)
                res.render('offers/offerCreation', {
                    ...offerToEdit.toJSON(), lat: offerToEdit.location.coordinates[1], lng: offerToEdit.location.coordinates[0]
                });
            } else {
                res.render('denied-route');
            }
        })
        .catch((err) => next(err));
}


module.exports.doEdit = (req, res, next) => {
    function renderWithErrors(errors) {
    res.status(400).render("offers/offerCreation", {
      errors: errors,
      offer: req.body,
      lat: req.body.lat,
      lng: req.body.lng
    });
  }
    req.body.location = {
        type: 'Point',
        coordinates: [req.body.lng, req.body.lat]
    }
    Offer.findByIdAndUpdate(req.params.id, req.body, {new: true})
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
    
    Application.findOne({ offer: req.params.id })
        .populate('offer')
        .then((application) => {
            if (application) {
                application.offer.active = false 
                application.save()
            }    
                Offer.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .then((offer) => {
                    offer.active = false;
                    offer.save();
                    //TO DO: mandar email candidato con proceso cerrado
                    // EJEMPLO
                    // sendCandidateActivationEmail(createdCandidate.email, createdCandidate.token);
                    res.redirect('/company-profile')
                })
        })
        .catch((err) => next(err));
}

module.exports.search = (req, res, next) => {
    //let query;
    // switch(true) {
    //     case req.query.category:
    //         Offer.find({"category": req.query.category})
    //         .then((offers) => {
    //             //console.log ('req.query.category', req.query.category)
    //             //console.log('offers', offers)
    //             res.render('offers/offersList', {offers})
    //         })
    //         break;
    //     case req.query.contractType:
    //         Offer.find({"ContractType": req.query.contractType})
    //             .then((offers) => {
    //                 //console.log ('req.query.category', req.query.category)
    //                 //console.log('offers', offers)
    //                 res.render('offers/offersList', {offers})
    //             })
    //         break;
    //     default:
    //         console.log('switch default')
    //         break;
    // }
   
    if (req.query.category) {
        Offer.find({ category: req.query.category })
            .populate('offers_publishedByCompany')
            .then((offers) => {
                //console.log ('req.query.category', req.query.category)
                //console.log('offers', offers)
                res.render('offers/offersList', {offers})
            })
    } else if (req.query.contract) {
        Offer.find({ contract: req.query.contract })
                .populate('offers_publishedByCompany')
                .then((offers) => {
                    console.log('offers', offers)
                    res.render('offers/offersList', {offers})
                })
    } else if (req.query.studies) {
        Offer.find({ studies: req.query.studies })
        .populate('offers_publishedByCompany')
        .then((offers) => {
            console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else if (req.query.experience) {
        Offer.find({ experience: req.query.experience })
        .populate('offers_publishedByCompany')
        .then((offers) => {
            console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else if (req.query.salary) {
        Offer.find({ salary: req.query.salary })
        .populate('offers_publishedByCompany')
        .then((offers) => {
            console.log('offers', offers)
            res.render('offers/offersList', {offers})
        })
    } else {
        console.log('else search')
    }  
}