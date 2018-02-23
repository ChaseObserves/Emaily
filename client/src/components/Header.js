import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="Payments">
            <Payments />
          </li>,
          <li key="Credits" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          /* This value automatically updates in the header once a payment has been completed. Here's why: 
this.props.auth is being produced by the authReducer. Anytime an action comes across with the type 
FETCH_USER, it returns the action's payload. In the Action Creator, the response to axios.post is the 
updated user model with the new number of credits, and after we get that response, we dispatch an action 
with type FETCH_USER with that user model as a payload. Long story short: Action Creator "when we get 
the response back from the API, update the value in the reducer" Reducer: "Okay I'll update the value 
and pull down the new user model" and because the authReducer ran and created a new piece of state, our 
Redux state updates, and because the Redux state updates, all of the Components in the app update/rerender 
with the new state. Now this.props.auth contains the new user model that just got returned from the API 
and the Header updates its text */
          <li key="Logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  // renderContent is a helper method. It includes a switch statement that will switch between the three possible options for the state of auth (null, false, or the User model object) as
  // defined in authReducer. We set the User model object to default to avoid hairy object syntax within the switch statement, as the other two were super easy: either "null" or "false"

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"} // The logic here is important. this.props.auth is a boolean, either the response returns a user object (true) or it returns an empty string (false). This ternary operator states that if this.props.user is true, let the logo route them to their survey dashboard. If it's false, route them to the landing page.
            className="left brand-logo"
            style={{ paddingLeft: 20 }}
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}{" "}
            {/* this line calls the helper method, which will loop through the switch statement, determine which case is true, then display the true result */}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  // On this line, the "auth" property is destructured off the state object by putting "auth" in curly brackets as the argument (see lines 36-42)
  return { auth }; // After destructering auth off of state and pulling state out of the function, "auth: auth.state" becomes "auth: auth" and since the key and value are the same, it becomes simply "auth"
}

// Lines 40-42 are the same function as above, just before a refactor. This function gets called with the entire state object as an argument, pulled out of the Redux store.
// This function needs to return an object that will be passed to the Header Component as props.
// The only piece of state we care about (for the Header) off the state object is the "auth" piece of state, which is a property defined in the /reducers/index.js file and assigned "authReducer"

// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

export default connect(mapStateToProps)(Header);
