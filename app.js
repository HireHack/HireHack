require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const hbs = require('hbs');
const routes = require('./config/routes');
const createError = require('http-errors');
const passport = require('passport');
const session = require('./config/session.config');
const Candidate = require('./models/candidate.model');
const Company = require ('./models/company.model')
require('./config/db.config');
require('./config/passport.config');

// Express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// hbs.registerHelper('unlessCond', (currentCandidate, currentCompany, options) => {
//     if(currentCandidate || currentCompany) {
//       return options.fn();
//     }
//     return options.inverse();
//   });

// Session config
// app.use((req, res, next) => {
//     if(req.session.currentCandidateId) {
//         Candidate.findById(req.session.currentCandidateId)
//             .then((candidate) => {
//                 if (candidate) {
//                     req.currentCandidate = candidate;
//                     res.locals.currentCandidate = candidate;
//                     next();
//                 } else {
//                     next();
//                 }
//             })
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     if(req.session.currentCompanyId) {
//         Company.findById(req.session.currentCompanyId)
//             .then((company) => {
//                 if (company) {
//                     req.currentCompany = company;
//                     res.locals.currentCompany = company;
//                     next();
//                 } else {
//                     next();
//                 }
//             })
//     } else {
//         next()
//     }
// })

//PASSPORT
app.use((req, res, next) => {
  //console.log('app.js', req.user)
  if (req.user) {
    if (req.user.surname) {
      console.log('I have a surname so I am a candidate')
      req.currentCandidate = req.user;
      res.locals.currentCandidate = req.user;
      next()
    } else {
      console.log('I guess I am a company')
      req.currentCompany = req.user;
      res.locals.currentCompany = req.user;
      next()
    }
  } else {
    //console.log('There is no user logged in')
    next()
  }
})


app.use('/', routes);

// Error handler
app.use((req, res, next) => {
    next(createError(404));
})

app.use((error, req, res, next) => {
    console.log(error);
    if (!error.status) {
        error = createError(500);
    } 
    res.status(error.status);
    res.render('error', error);
})

// Initialization on port
app.listen(process.env.PORT || 3000, () => console.log(`listening on port ${process.env.PORT}`));