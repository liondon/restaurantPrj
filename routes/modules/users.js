const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword) {
    req.flash('warning_msg', 'Password and Confirm Password do not match!')
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        req.flash('warning_msg', 'This email has been registered!')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        })
          .then(user => {
            req.flash('success_msg', 'Registration succeeded!')
            res.redirect('/users/login')
          })
      }
    })
    .catch(err => console.log(err))

})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  // failureMessage: true,
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have logged out successfully.')
  res.redirect('/users/login')
})

module.exports = router