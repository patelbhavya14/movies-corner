import axios from 'axios';
import {
    PROFILE_FOLLOWERS_ERROR,
    PROFILE_FOLLOWERS_SUCCESS,
    PROFILE_FOLLOWINGS_ERROR,
    PROFILE_FOLLOWINGS_SUCCESS,
    PROFILE_INFORMATION_ERROR,
    PROFILE_INFORMATION_SUCCESS, PROFILE_RATINGS_ERROR, PROFILE_RATINGS_SUCCESS,
    PROFILE_WATCHLIST_ERROR, PROFILE_WATCHLIST_SUCCESS,
    USER_FOLLOW_ERROR,
    USER_FOLLOW_SUCCESS,
    USER_UNFOLLOW_ERROR,
    USER_UNFOLLOW_SUCCESS
} from "./types";
import {setAuthToken} from "../utils/setAuthToken";

// Get Profile Information
export const getProfileInformation = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/${userId}`, setAuthToken());
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
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/followings/${userId}`, setAuthToken());

        console.log(res.data);
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
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/followers/${userId}`, setAuthToken());

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

// Follow user
export const follow = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/follow/${userId}`, setAuthToken());

        dispatch({
           type: USER_FOLLOW_SUCCESS
        });
    } catch(err) {
        dispatch({
            type: USER_FOLLOW_ERROR
        });
    }
};

// Follow user
export const unfollow = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/unfollow/${userId}`, setAuthToken());

        dispatch({
            type: USER_UNFOLLOW_SUCCESS
        });
    } catch(err) {
        dispatch({
            type: USER_UNFOLLOW_ERROR
        });
    }
};

// Get watchlist
export const getWatchList = (userId) => async dispatch => {
  try {
      const res = await axios.get(`http://localhost:8080/MoviesCorner/api/movies/watchlist/${userId}`);
      dispatch({
          type: PROFILE_WATCHLIST_SUCCESS,
          payload: res.data
      });
  } catch(err) {
      dispatch({
          type: PROFILE_WATCHLIST_ERROR
      });
  }
};

// Get user ratings
export const getUserRatings = (userId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/movies/ratings/users/${userId}`);
        dispatch({
            type: PROFILE_RATINGS_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROFILE_RATINGS_ERROR
        });
    }
};