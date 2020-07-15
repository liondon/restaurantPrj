const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      // let errors = []
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'This email has not been registered.'))
          }
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'
                ))
              }
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) {
          return done(null, user)
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        User.create({
          name,
          email,
          password: bcrypt.hashSync(randomPassword, bcrypt.genSaltSync(10))
        })
          .then(user => done(null, user))
      })
      .catch(err => done(err, false))

  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}