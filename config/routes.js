const router = require('express').Router();
const passport = require('passport')
const miscController = require('../controllers/misc.controller');
const candidatesController = require('../controllers/candidates.controller');
const companiesController = require('../controllers/companies.controller');
const offersController = require('../controllers/offers.controller');
const secureCompany = require('../middlewares/secureCompany.middleware')
const secureCandidate = require('../middlewares/secureCandidate.middleware')

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// MISC
router.get('/', miscController.home);

// CANDIDATES
router.get('/candidate-profile',  candidatesController.candidateProfile);
router.get('/candidate-signup',  candidatesController.signup);
router.post('/candidate-signup',  candidatesController.doSignup);
router.get('/candidate-login',  candidatesController.login);
router.post('/candidate-login',  candidatesController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth-candidates', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/callback', candidatesController.doLoginGoogle)
router.post('/candidate-logout',  candidatesController.logout);
/* Edit candidate profile route */
/* Delete candidate profile route */

// COMPANIES
router.get('/company-profile',  companiesController.companyProfile);
router.get('/company-signup',  companiesController.signup);
router.post('/company-signup',  companiesController.doSignup);
router.get('/company-login',  companiesController.login);
router.post('/company-login', companiesController.doLogin);
router.get('/auth/google', passport.authenticate('google-auth-companies', {scope: GOOGLE_SCOPES}))
router.get('/auth/google/callback', companiesController.doLoginGoogle)
router.post('/company-logout',  companiesController.logout);
/* Edit company profile route */
/* Delete company profile route */


// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail/:id', offersController.offerDetail);
router.get('/offer-creation', offersController.create);
router.post('/offer-creation', secureCompany.companyIsAuthenticated, offersController.doCreate);
/* Edit offer route */
/* Delete offer route */


module.exports = router;