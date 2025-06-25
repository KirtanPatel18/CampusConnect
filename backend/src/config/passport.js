const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("./db.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // First, try to find user by email (to handle users who signed up with email/password)
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (user) {
          // If user exists but doesn't have a googleId, update them
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { email: profile.emails[0].value },
              data: { googleId: profile.id, authProvider: "google" },
            });
          }
          return done(null, user);
        }

        // If no user found by email, create a new user
        user = await prisma.user.create({
          data: {
            googleId: profile.id,
            email: profile.emails[0].value,
            full_name: profile.displayName,
            authProvider: "google",
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
