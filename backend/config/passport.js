// require("dotenv").config();
// const User = require("../model/user.other.model");
// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// const passport = require("passport");
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET_KEY;
// passport.use(
//   new JwtStrategy(opts, async function (jwt_payload, done) {
//     await User.findOne({ id: jwt_payload.id }, function (err, user) {
//       if (err) {
//         console.log('Passport Error')
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );

require("dotenv").config();
const User = require("../model/user.other.model");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {};
console.log("JWT:",ExtractJwt)
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log('Passport Error:', err);
      return done(err, false);
    }
  })
);
