const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// The User object defined below is our model class. The model class gives us a connection or handle on the
// underlying collection inside of MongoDB. We can use this model class to create a new model instance and then
// save it, or "persist it" to the database. It also pulls the schema out of mongoose and 
// gives Passport access to use it (the model class). 

const User = mongoose.model('users'); // One argument (i.e. 'users') means we're trying to fetch something out of mongoose, two arguments means we're trying to load something into it.

// We don't use require statements for the model class because sometimes in a testing environment, mongoose will
// think you're trying to load in multiple collections named 'users' and will throw an error saying "you already
// have a collection named 'users.'" This is a workaround.

// This function is automatically called by Passport using the User model that is fetched when a returning user
// logs in. It takes the user model and generates an identifiying piece of info, then gives it back to Passport,
// which then stuffs the id into a cookie and gives it back to the browser.
passport.serializeUser((user, done) => { // We are defining an anonymous arrow function and passing it to serializeUser, which is a Passport function
    done(null, user.id); // user.id is NOT profile.id. profile.id is the googleID that is pulled from the OAuth process, user.id is a unique identifier created by Mongo and assigned to this user's record
}); // We use the user id rather than the google profile id because we could use multiple authentication methods (Google, Facebook, LinkedIn, etc)

// This function is called by Passport and turns a user id (the piece of info contained in the cookie) into a
// User model instance. deserializeUser then passes the user model back to Passport which then recognizes the
// existing user. It is then added to the 'req' object as 'req.user' which will be used in all of our
// Express route handlers.
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        // Inside of this callback function below we are a) searching the MongoDB Collection to see if an account
        // already exists for the user attempting to login, and b) using the model class to create a new instance of
        // a user The "async" and "await" syntax found in this callback function is newer Javascript and replaces the
        // ".then()" promises syntax to make it more clean and readable.
    },
    async (accessToken, refreshToken, profile, done) => { // GoogleStrategy callback function querying Mongoose. Arguments here come from Passport
        const existingUser = await User.findOne({ googleID: profile.id }) // This initiates a search over all the users in the database to ensure that a record does not exist for them, or that no googleID matches the profile.id, which is what is returned to us from the OAuth process
        if (existingUser) { // If a record does exist for the user's profile id, it will stop the user creation flow and log the user into its existing account."existingUser" represents the model instance of the user who was found in the search (if one was found aka if the user does have an account)
            done(null, existingUser); // Tells Passport that we have found a user and it should now resume the auth process. First argument is an error object, second object is the user record.
        } else { // If no record exists for the person (id) attempting to sign in, create a new user instance for them
            const user = await new User({ googleID: profile.id }).save() // This code creates a new mongoose model instance of a user. It represents a single record that might exist inside our database. This code then saves, or "persists" the user instance to the MongoDB database
            done(null, user) // Tells Passport that we have finished creating a user and it should now resume the auth process. Is called with the new user who was just saved 
        }  
    })
);