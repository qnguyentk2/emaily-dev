const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI); // connect to mongoDB

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; // deploy out code to heroku. Heroku will tell us which port could be used. 

app.listen(PORT);