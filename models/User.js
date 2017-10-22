const mongoose = require('mongoose');
const { Schema } = mongoose;

// create a new schema => userSchema
const userSchema = new Schema({
    googleId: String,
    userName: String,
    fullName: String
});

mongoose.model('users', userSchema); // users is the name of collection

// export the User Model
