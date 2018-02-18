import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // This Provider tag allows deeply nested components easy access to Redux store state, acts as the glue between React and Redux
import { createStore, applyMiddleware } from 'redux'; // These are helpers from Redux

import App from './components/App';
import reducers from './reducers';

// This creates a Redux store at the very top level of our application. This stores all state in the app.
// The arguments to createStore are all the reducers we have in our app
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);
// A) Provider is a React component that knows how to read changes from our Redux store. Anytime our Redux
// store gets some new state produced inside of it, the Provider will inform all of its children components
// of that some new state is available and will update them with this new state.
// B) By placing the Provider tag at the top level and appending the App component as a child, we have now
// given every component in the app, no matter how deeply nested, easy one-step access to state in the store.
// C) This wires up our React and Redux portions of the app together.