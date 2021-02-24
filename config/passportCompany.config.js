const passport = require('passport');
const mongoose = require ('mongoose')

const Company = require('../models/company.model');

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.serializeUser ((company, next) => {
    next(null, company.id);
})

passport.deserializeUser ((id, next) => {
    Company.findById(id)
        .then((company) => next(null, company))
        .catch(next);
})

//LOCAL
passport.use('local-auth-companies', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  Company.findOne({ email: email })
    .then((company) => {
      if (!company) {
        next(null, false, { error: "El correo electrónico o la contraseña no son correctos" })
      } else {
        return company.checkPassword(password)
          .then(match => {
            if (match) {
            //   if (company.active) {
                next(null, company)
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
passport.use('google-auth-companies', new GoogleStrategy({
    clientID: process.env.GCO_CLIENT_ID,
    clientSecret: process.env.GCO_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, next) => {
        const googleID = profile.id
        const email = profile.emails[0] ? profile.emails[0].value : undefined

        if (googleID && email) {
            Company.findOne({
                $or: [
                    { email: email },
                    {'social.google': googleID}
                ]
            }).then(company => {
                if (!company) {
                    const newCompanyInstance = new Company({
                        name: email,
                        email: email,
                        social: {
                            google: googleID
                        },
                        //active: true,
                        password: 'Aa1' + mongoose.Types.ObjectId()
                    })
                    return newCompanyInstance.save()
                        .then(newCompany => {
                            next(null, newCompany)
                        })
                } else {
                    next(null, company)
                }
            }).catch(next)
        } else {
            next(null, false, {errors: "Error con el proveedor Oauth"})
        }

}))
