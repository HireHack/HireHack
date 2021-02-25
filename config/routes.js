const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const candidatesController = require('../controllers/candidates.controller');
const companiesController = require('../controllers/companies.controller');
const offersController = require('../controllers/offers.controller');
const secureCompany = require('../middlewares/secureCompany.middleware')
const secureCandidate = require ('../middlewares/secureCandidate.middleware')

// MISC
router.get('/', miscController.home);
router.get('/main-login', miscController.mainLogin);
// router.get('/delete-profile', miscController.deleteProfile);
//router.get('/delete-profile', miscController.doDeleteProfile);

// CANDIDATES
router.get('/candidate-profile', secureCandidate.candidateIsAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.candidateProfile);
router.get('/candidate-signup', secureCandidate.candidateIsNotAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.signup);
router.post('/candidate-signup', secureCandidate.candidateIsNotAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.doSignup);
router.get('/candidate-login', secureCandidate.candidateIsNotAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.login);
router.post('/candidate-login', secureCandidate.candidateIsNotAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.doLogin);
router.post('/candidate-logout', secureCandidate.candidateIsAuthenticated, secureCompany.companyIsNotAuthenticated, candidatesController.logout);
/* Edit candidate profile route GET */
/* Edit candidate profile route POST */
router.post('/delete-candidate/:id', candidatesController.delete); // TODO --> Nodemailer confirmation email to permanently delete profile

// COMPANIES
router.get('/company-profile', secureCompany.companyIsAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.companyProfile);
router.get('/company-signup', secureCompany.companyIsNotAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.signup);
router.post('/company-signup', secureCompany.companyIsNotAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.doSignup);
router.get('/company-login', secureCompany.companyIsNotAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.login);
router.post('/company-login', secureCompany.companyIsNotAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.doLogin);
router.post('/company-logout', secureCompany.companyIsAuthenticated, secureCandidate.candidateIsNotAuthenticated, companiesController.logout);
/* Edit company profile route GET */
/* Edit company profile route POST */
router.post('/delete-company/:id', companiesController.delete); // TODO --> Nodemailer confirmation email to permanently delete profile


// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail/:id', offersController.offerDetail);
router.get('/offer-creation', offersController.create);
router.post('/offer-creation', secureCompany.companyIsAuthenticated, offersController.doCreate);
/* Edit offer route GET */
/* Edit offer route POST */
router.post('/delete-offer/:id', offersController.delete);



module.exports = router;