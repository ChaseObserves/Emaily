const keys = require("../config/keys"); // We have to require in the keys for line 2
const stripe = require("stripe")(keys.stripeSecretKey); // Stripe requires you to not only require in the node module but also the secret key
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // The reason requireLogin is listed here as an argument rather than called is because we don't want requireLogin to run the instant that request is made. Instead, we give express a reference to the function and allow express to call it internally when it needs to.
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5.00 for 5 Emaily Credits",
      source: req.body.id
    });

    // With passport, we can always access the current user model with req.user, that functionality is built into it.
    req.user.credits += 5;
    const user = await req.user.save();
    // Why do we create a new variable "user" when the user model is accessible to us via req.user? Because while in theory they both represent the same user,
    // in practice whenever we save a user model to the database, from that point on we use the user model that we just got back as a response from the database
    // as it has the most up-to-date information available for that user.
    res.send(user);
  });
};
