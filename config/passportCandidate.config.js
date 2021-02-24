const passport = require('passport');
const mongoose = require ('mongoose')

const Candidate = require('../models/candidate.model');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser ((candidate, next) => {
    next(null, candidate.id);
})

passport.deserializeUser ((id, next) => {
    Candidate.findById(id)
        .then((candidate) => next(null, candidate))
        .catch(next);
})

//LOCAL
passport.use('local-auth-candidates', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  Candidate.findOne({ email: email })
    .then((candidate) => {
      if (!candidate) {
        next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
      } else {
        return candidate.checkPassword(password)
          .then(match => {
            if (match) {
            //   if (candidate.active) {
                next(null, candidate)
            //   } else {
            //     next(null, false, { error: "Tu cuenta no está activa, mira tu email" })
            //   }
            } else {
              next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
            }
          })
      }
    })
    .catch(next)
}))

//GOOGLE
passport.use('google-auth-candidates', new GoogleStrategy({
    clientID: process.env.GCA_CLIENT_ID,
    clientSecret: process.env.GCA_CLIENT_SECRET,
    callbackURL: '/authenticate/google/callback'
}, (accessToken, refreshToken, profile, next) => {
        const googleID = profile.id
        const email = profile.emails[0] ? profile.emails[0].value : undefined

        if (googleID && email) {
            Candidate.findOne({
                $or: [
                    { email: email },
                    {'social.google': googleID}
                ]
            }).then(candidate => {
                if (!candidate) {
                    const newCandidateInstance = new Candidate({
                        name: email,
                        surname: email,
                        email: email,
                        social: {
                            google: googleID
                        },
                        //active: true,
                        password: 'Aa1' + mongoose.Types.ObjectId()
                    })
                    return newCandidateInstance.save()
                        .then(newCandidate => {
                            next(null, newCandidate)
                        })
                } else {
                    next(null, candidate)
                }
            }).catch(next)
        } else {
            next(null, false, {errors: "Error con el proveedor Oauth"})
        }

}))

//LINKEDIN
// passport.use('linkedin-auth-candidates', new LinkedInStrategy({
//     clientID: process.env.L_CLIENT_ID,
//     clientSecret: process.env.L_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
//     scope: ['r_emailaddress', 'r_liteprofile'],
//     passReqToCallback: true
// }, (accessToken, refreshToken, profile, next) => {
//         const linkedinID = profile.id
//         const email = profile.emails[0] ? profile.emails[0].value : undefined

//         if (linkedinID && email) {
//             Candidate.findOne({
//                 $or: [
//                     { email: email },
//                     {'social.linkedin': linkedinID}
//                 ]
//             }).then(candidate => {
//                 if (!candidate) {
//                     const newCandidateInstance = new Candidate({
//                         name: email,
//                         surname: email,
//                         email: email,
//                         social: {
//                             linkedin: linkedinID
//                         },
//                         tokens: accessToken,
//                         //active: true,
//                         password: 'Aa1' + mongoose.Types.ObjectId()
//                     })
//                     return newCandidateInstance.save()
//                         .then(newCandidate => {
//                             next(null, newCandidate)
//                         })
//                 } else {
//                     next(null, candidate)
//                 }
//             }).catch(next)
//         } else {
//             next(null, false, {errors: "Error con el proveedor Oauth"})
//         }
// }))

