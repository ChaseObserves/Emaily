const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User'); // This require statement MUST be above the one below. This defines the user model.
require('./services/passport'); // and this makes use of the user model. You have to define it before you can use it.

mongoose.connect(keys.mongoURI);

const app = express();

// Call app.use which is a function, pass cookieSession to it, call cookieSession, and provide a configuration 
// object. This wires cookies up into the app, and the two statements below this one tell our app to use cookies
// for authentication.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //This is 30 days in milliseconds. This is how long the cookie lasts in the browser
        keys: [keys.cookieKey]
    })
)

// These statements tell PassportJS to use cookies for authentication.
app.use(passport.initialize());
app.use(passport.session());

// This syntax on line 16 looks weird, right? It's actually perfectly valid JS.
// Instead of creating a variable at the top called 'authRoutes' and setting it
// equal to 'require('.routes/authRoutes')' and then calling authRoutes() down here
// and passing in the 'app' variable from express, we're just eliminating that superfluous
// authRoutes variable altogether, and bringing the require statement down where we would've
// called the function. We can do this because '.routes/authRoutes' _is_ a function
// that's being exported. The second set of parantheses just includes the argument
// that's being passed into that function.
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("App listening on port " + PORT);
});