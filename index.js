const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');// to handle cookie
const passport = require('passport');// to handle cookie
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI); // connect to mongoDB

require('./models/User');
require('./services/passport');

const app = express();

//maxAge: how long cookie can existed in our browser before expired
// create a cookie session
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days
        keys: [keys.cookieKey]
    })
);

// tell passport that it should use a cookie to handle our session
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // deploy out code to heroku. Heroku will tell us which port could be used. 

app.listen(PORT);