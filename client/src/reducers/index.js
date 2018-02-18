import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});

// Whatever keys we provide to this object-the one being passed into the combineReducers call-are going represent the keys that exist inside our state object