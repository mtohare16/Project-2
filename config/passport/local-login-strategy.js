var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

var strategy = new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
}, function(req, email, password, callback) {
  //Search for a user with this email
  User.findOne({ 'local.email' : email }, function(err, user) {
    if (err) return callback(err);

    //If no user is found
    if (!user) {
      return callback(null, false, req.flash('error', 'User not found.'));
    }

    //Validate password
    if (!user.isValidPassword(password)) {
      return callback(null, false, req.flash('error', 'Ooops! Wrong password.'));
    }
    return callback(null, user);
  });
});

module.exports = strategy;

