const mongoose = require('mongoose');
const Offer = require('../models/offer.model');
const Candidate = require('../models/candidate.model');
const Application = require('../models/application.model')
const flash = require('connect-flash');

module.exports.detail = (req, res, next) => {
    const offer = req.params.id
    //console.log('idOffer', offer)
    Offer.findById(offer)
        .then((offer) => {
            Application.find({
                    'offer': offer._id
                })
                .populate('candidate')
                .then((application) => {
                    //console.log('application', application)
                    res.render('application/application-detail', {
                        offer,
                        application
                    })
                })
        })
};

module.exports.apply = (req, res, next) => {

    const offer = req.params.id
    const candidate = req.currentCandidate.id

    Application.findOne({
            $and: [{
                offer: offer
            }, {
                candidate: candidate
            }]
        })
        .then((application) => {
            if (application) {
                req.flash('flashMessage', '¡Ya estás inscrito en esta oferta!')
                res.redirect('/candidate-profile')
            } else {
                Application.create({
                        candidate: candidate,
                        offer: offer
                    })
                    .then((createdApplication) => {
                        //console.log ('APPcreatedApplication', createdApplication)
                        //res.render('candidates/candidateProfile', createdApplication);
                        res.redirect('/candidate-profile')
                    })
                    .catch((err) => next(err))
            }
        })
        .catch((err) => next(err))
}

module.exports.search = (req, res, next) => {
    if (req.query.age) {
        Candidate.find({ age: req.query.age })
            .then((candidates) => {
                //console.log('foundCandidates', candidates)
                //console.log('req.query.age', req.query.age)
                candidates.forEach(candidate => {
                    Application.find({ candidate: candidate.id })
                        .populate('offer')
                        .then((applications) => {
                            applications.forEach((application) => {
                                //console.log('application.offer', application.offer)
                                res.render('application/application-detail', {candidates, offer: application.offer})
                            })
                        })
                        .catch((e)=> next(e)) 
                })
            })
            .catch((e)=> next(e))
    } else if (req.query.address) {
        //console.log('req.query', req.query)
        Candidate.find()
            .then((candidatesFound) => {
                //console.log('candidatesFound', candidatesFound)
                const queryAddress = req.query.address.toLowerCase().slice(1)
                //console.log('req.query.search', queryAddress)
                let filteredCandidates = []
                candidatesFound.forEach((c) => {
                    //console.log('candidates forEach', c)
                    const cityCandidate = c.address
                    if (cityCandidate.includes(queryAddress)) {
                        filteredCandidates.push(c);
                    }
                })
                console.log('filteredCandidates', filteredCandidates)
                return filteredCandidates
            })
            .then((candidates) => {
                candidates.forEach(candidate => {
                Application.find({ candidate: candidate.id })
                        .populate('offer')
                        .then((applications) => {
                            applications.forEach((application) => {
                                console.log('application.offer', application.offer)
                                res.render('application/application-detail', {candidates, offer: application.offer})
                            })
                        })
                        .catch((e) => next(e))
                })
            })
            .catch((e) => next(e))
    }else {
        console.log('else')
        next()
    }
}