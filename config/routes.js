const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const candidatesController = require('../controllers/candidates.controller');
const companiesController = require('../controllers/companies.controller');
const offersController = require('../controllers/offers.controller');

// MISC
router.get('/', miscController.home);

// CANDIDATES
router.get('/candidate-profile', candidatesController.candidateProfile);
router.get('/candidate-signup', candidatesController.signup);
router.get('/candidate-login', candidatesController.login);

// COMPANIES
router.get('/company-profile', companiesController.companyProfile);
router.get('/company-signup', companiesController.signup);
router.get('/company-login', companiesController.login);

// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail', offersController.offerDetail);
router.get('/offer-creation', offersController.offerCreation);

module.exports = router;