// This figures out what set of credentials to return
if (process.env.NODE_ENV === 'production') { // Heroku automatically sets NODE_ENV to 'production'
    // We are in production, return the prod set of keys
    module.exports = require('./prod');
} else {
    // We are in dev, return the dev set of keys
    module.exports = require('./dev'); // This both calls in and exports the dev keys at the same time, to be used everywhere in the app when running in a dev environment.
}
