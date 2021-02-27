const mongoose = require('mongoose');
const Offer = require('../models/offer.model');
const Candidate = require('../models/candidate.model');
const Application = require('../models/application.model')
const flash = require ('connect-flash');

module.exports.detail = (req, res, next) => {
    const offer = req.params.id
    //console.log('idOffer', offer)
    Offer.findById(offer)
        .then((offer) => {
            Application.find({ 'offer': offer._id })
                .populate('candidate')
                .then((application) => {
                    console.log('application', application)
                    res.render('application/application-detail', { offer, application })
                })
        })
};

module.exports.apply = (req, res, next) => {

    const offer = req.params.id
    const candidate = req.currentCandidate.id
    
    Application.findOne({$and: [{ offer: offer }, {candidate: candidate}]})
        .then((application) => {
            if(application) {
                req.flash('flashMessage', '¡Ya estás inscrito en esta oferta!')
                res.redirect('/candidate-profile')
            } else {
                Application.create({candidate: candidate, offer: offer})
                    .then((createdApplication) => {
                        console.log ('APPcreatedApplication', createdApplication)
                        //res.render('candidates/candidateProfile', createdApplication);
                        res.redirect('/candidate-profile')
                    })
                    .catch((err) => next(err))
                }
            })
        .catch((err) => next(err))
}