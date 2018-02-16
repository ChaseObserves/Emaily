const mongoose = require('mongoose');
// This is destructuring of const Schema = mongoose.Schema. The curly brackets here are
// saying the mongoose object has a property called 'Schema.' Take that property and assign
// it to a variable named Schema.
const { Schema } = mongoose;

// This defines and creates the schema that we will use to load users into the database. The googleID is a string
// unique to Google accounts
const userSchema = new Schema({
    googleID: String
});

// This creates our model class aka "collection" and loads the schema into mongoose
mongoose.model('users', userSchema); // One argument means we're trying to fetch something out of mongoose, two arguments (i.e. 'users', userSchema) means we're trying to load something into it.
