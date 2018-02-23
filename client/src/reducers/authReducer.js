import { FETCH_USER } from "../actions/types";

// This auth reducer stores the user model

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // This payload is the user model from MongoDB or "false" if they're not logged in. The default state is null (see line 3) and that's the state of auth when we're not sure if a user is logged in or out yet, aka the API call is still pending.
    default:
      return state;
  }
}
