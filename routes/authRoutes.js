const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout(); // this function is from passport, but this didn't remove cookie
        res.send("You are logged out!!");
    });

    app.get('/api/current_user', (req, res) => {
        // res.send(req.session);
        res.send(req.user); // user : this object was returned from deserializeUser from passport.js
    });
};
