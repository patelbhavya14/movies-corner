import axios from 'axios';
import {
    PROFILE_FOLLOWERS_ERROR,
    PROFILE_FOLLOWERS_SUCCESS,
    PROFILE_FOLLOWINGS_ERROR,
    PROFILE_FOLLOWINGS_SUCCESS,
    PROFILE_INFORMATION_ERROR,
    PROFILE_INFORMATION_SUCCESS
} from "./types";

// Get Profile Information
export const getProfileInformation = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/${userId}`);

        dispatch({
            type: PROFILE_INFORMATION_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_INFORMATION_ERROR
        });
    }
};

// Get Profile followings
export const getFollowings = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/followings/${userId}`);

        dispatch({
            type: PROFILE_FOLLOWINGS_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROFILE_FOLLOWINGS_ERROR
        })
    }
};

// Get Profile followers
export const getFollowers = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/followers/${userId}`);

        dispatch({
            type: PROFILE_FOLLOWERS_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROFILE_FOLLOWERS_ERROR
        })
    }
};