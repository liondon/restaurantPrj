const { modelName } = require("../models/user");

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please login.')
    return res.redirect('/users/login')
  }
}