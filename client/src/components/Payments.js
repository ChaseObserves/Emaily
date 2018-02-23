import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 Email Credits"
        amount={500} // amount in US cents
        token={token => this.props.handleToken(token)} // This is not the API key. This is expecting to receive a callback function which will be called once we successully retrieve an authorization token from the Stripe API. The callback function will be the Action Creator that handles the token.
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
// Because we have passed in the actions as an argument to the connect() function on the Payments component, we can now access all the Action Creators as props.
