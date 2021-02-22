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
router.post('/candidate-signup', candidatesController.doSignup);
router.get('/candidate-login', candidatesController.login);
router.post('/candidate-login', candidatesController.doLogin);
router.post('/candidate-logout', candidatesController.logout);

// COMPANIES
router.get('/company-profile', companiesController.companyProfile);
router.get('/company-signup', companiesController.signup);
router.post('/company-signup', companiesController.doSignup);
router.get('/company-login', companiesController.login);
router.post('/company-login', companiesController.doLogin);
router.post('/company-logout', companiesController.logout);

// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail', offersController.offerDetail);
router.get('/offer-creation', offersController.offerCreation);

module.exports = router;