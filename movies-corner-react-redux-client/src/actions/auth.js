import axios from 'axios';
import { setAlert } from "./alert";
import setAuthToken  from '../utils/setAuthToken';
import {AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "./types";

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:8080/MoviesCorner/api/auth/getUserDetails');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

// Register User
export const register = ({ userName, password, firstName, lastName, userRole}) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    const body = JSON.stringify({userName, password, firstName, lastName, userRole});

    try {
        const res = await axios.post('http://localhost:8080/MoviesCorner/api/auth/register', body, config);

        console.log(JSON.stringify(res));
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch(err) {
        const errors = err.response.data.error;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};