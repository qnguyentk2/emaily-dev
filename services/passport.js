const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serializeUser => after authen success call the serializeUsere to identifi information to set cookie or token,...  
// this function to encode the user object 
passport.serializeUser((user, done) => { //user the collection users in MongoDB
    done(null, user.id); // we user.id intead of the googleID because when use login with facebook, we can't select the googleID
});
// this function to decode user Object 
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

passport.use(
    new GoogleStrategy (
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }) // this function will return a promise 
                .then((existingUser) => {
                    if(existingUser) {
                        // we already have a record with the given profile.id
                        // call done after login success
                        done(null, existingUser); // null(no error) => error object
                    } else {
                        // accause is not existed 
                        // after login success, take googleId from profile and save it to MongoDB
                        new User({ 
                            googleId : profile.id,
                            userName: profile.displayName,
                            fullName: profile.name.familyName + " " + profile.name.givenName
                        }).save() // save() => save the module and its instance to MongoDB
                            .then(user => done(null, user)); // user => new user
                    }
                });
            
        }
    )
);