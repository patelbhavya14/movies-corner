import { combineReducers } from 'redux';
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
    auth,
    alert,
    profile,
    routing: routerReducer
});