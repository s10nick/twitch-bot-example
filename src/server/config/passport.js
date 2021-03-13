const passport       = require("passport")
const twitchStrategy = require("passport-twitch").Strategy
const Users = require('../models/Users')

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

passport.use(new twitchStrategy({
    clientID: "client-id",
    clientSecret: "channel-secret",
    callbackURL: "http://localhost/",
    scope: "user_read"
  },
  function(accessToken, refreshToken, profile, done) {
    Users.findOne({ twitchId: profile.id }, function (err, user) {
      if(!user) {
        user = new Users({
          twitchId: profile.id,
          profile: profile
        });
        user.save(function(err) {
          if (err) return done(err, false)
          return done(null, user)
        })
      } else { return done(null, user) }
    })
  }
))

module.exports = passport
