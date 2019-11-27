import { combineReducers } from 'redux';
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import search from "./search";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
    auth,
    alert,
    profile,
    search,
    routing: routerReducer
});