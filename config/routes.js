const router = require('express').Router();
const passport = require('passport')
const miscController = require('../controllers/misc.controller');
const candidatesController = require('../controllers/candidates.controller');
const companiesController = require('../controllers/companies.controller');
const offersController = require('../controllers/offers.controller');
const applicationController = require('../controllers/application.controller');
const secure = require("../middlewares/secure.middleware");
const multer = require('multer');
const upload = require ('./storage.config');
const express = require('express');

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

// MISC
router.get('/', miscController.home);
router.get('/main-login', miscController.mainLogin);
router.get('/search', miscController.search)

// CANDIDATES
router.get('/candidate-profile', secure.checkRole('CANDIDATE'), candidatesController.candidateProfile);

router.get('/candidate-signup', candidatesController.signup);
router.post('/candidate-signup', candidatesController.doSignup);
router.get('/activate-candidate/:token', candidatesController.activate);

router.get('/candidate-login', candidatesController.login);
router.post('/candidate-login', candidatesController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth-candidates', {
    scope: GOOGLE_SCOPES
}));
router.get('/authenticate/google/callback', candidatesController.doLoginGoogle);
router.post('/candidate-logout', secure.checkRole('CANDIDATE'), candidatesController.logout);

router.get('/candidate-edit/:id', secure.checkRole('CANDIDATE'), candidatesController.edit)
router.post('/candidate-edit/:id', secure.checkRole('CANDIDATE'), upload.fields([{ name: 'picture', maxCount: 1 }, { name: 'cv',maxCount: 1 }]), candidatesController.doEdit)
router.post('/candidate-update-email', secure.checkRole('CANDIDATE'), candidatesController.updateEmail);
router.post('/candidate-edit-email', secure.checkRole('CANDIDATE'), candidatesController.doEditEmail);
router.get('/candidate-edit-email/:token', secure.checkRole('CANDIDATE'), candidatesController.editEmail);
router.post('/candidate-update-password', secure.checkRole('CANDIDATE'), candidatesController.updatePassword);
router.get('/candidate-edit-password/:token', secure.checkRole('CANDIDATE'), candidatesController.editPassword);
router.post('/candidate-edit-password', secure.checkRole('CANDIDATE'), candidatesController.doEditPassword);

router.post('/delete-candidate', secure.checkRole('CANDIDATE'), candidatesController.delete);
router.get('/delete-candidate/:token', candidatesController.doDelete);

// COMPANIES
router.get('/company-profile', secure.checkRole('COMPANY'), companiesController.companyProfile);

router.get('/company-signup', companiesController.signup);
router.post('/company-signup', companiesController.doSignup);
router.get('/activate-company/:token', companiesController.activate);

router.get('/company-login', companiesController.login);
router.post('/company-login', companiesController.doLogin);
router.get('/auth/google', passport.authenticate('google-auth-companies', {
    scope: GOOGLE_SCOPES
}));
router.get('/auth/google/callback', companiesController.doLoginGoogle);
router.post('/company-logout', secure.checkRole('COMPANY'), companiesController.logout);

router.get('/company-edit', secure.checkRole('COMPANY'), companiesController.edit);
router.post('/company-edit', secure.checkRole('COMPANY'), upload.single('picture'), companiesController.doEdit); // REVISAR
router.post('/company-update-email', secure.checkRole('COMPANY'), companiesController.updateEmail);
router.post('/company-edit-email', secure.checkRole('COMPANY'), companiesController.doEditEmail);
router.get('/company-edit-email/:token', secure.checkRole('COMPANY'), companiesController.editEmail);
router.post('/company-update-password/', secure.checkRole('COMPANY'), companiesController.updatePassword);
router.post('/company-edit-password', secure.checkRole('COMPANY'), companiesController.doEditPassword);
router.get('/company-edit-password/:token', secure.checkRole('COMPANY'), companiesController.editPassword);

router.post('/delete-company', secure.checkRole('COMPANY'), companiesController.delete);
router.get('/delete-company/:token', companiesController.doDelete);
// TODO --> REST ROUTES: router.get('/delete/company/:token', companiesController.doDelete);

// OFFERS
router.get('/offers-list', offersController.offersList);
router.get('/offer-detail/:id', offersController.offerDetail);
router.get('/offer-creation', secure.checkRole('COMPANY'), offersController.create);
router.post('/offer-creation', secure.checkRole('COMPANY'), offersController.doCreate);
router.get('/edit-offer/:id', secure.checkRole('COMPANY'), offersController.edit);
router.post('/edit-offer/:id', secure.checkRole('COMPANY'), offersController.doEdit);
router.post('/delete-offer/:id', secure.checkRole('COMPANY'), offersController.delete);
router.get('/search-offers', offersController.search);
router.post('/offers/:id/paid', secure.checkRole('COMPANY'), offersController.paid);
router.post('/offers/webhook', express.raw({ type: 'application/json'}), offersController.webhook);

// APPLICATION
router.get('/application-detail/:id', secure.checkRole('COMPANY'),applicationController.detail);
router.post('/apply/:id', secure.checkRole('CANDIDATE'), applicationController.apply);
router.get('/application-search', applicationController.search)


module.exports = router;