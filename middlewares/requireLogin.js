module.exports = (req, res, next) => {
  // "Next" is like "done" in that it moves on to execute the route (or pass on to the next middleware in the chain) after the middleware is done running
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  // If a user is not logged in, stop moving through the request/middleware chain and throw a 401 error.
  next();
};
