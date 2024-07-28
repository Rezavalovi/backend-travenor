const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const { User } = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { facebookId: profile.id },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await User.create({
          facebookId: profile.id,
          email: profile.emails[0].value,
          username: `${profile.name.givenName} ${profile.name.familyName}`,
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

// Twitter Strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { twitterId: profile.id },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await User.create({
          twitterId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

// Instagram Strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/auth/instagram/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          where: { instagramId: profile.id },
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await User.create({
          instagramId: profile.id,
          username: profile.displayName,
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

module.exports = passport;
