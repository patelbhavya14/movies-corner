import {
    DELETE_REVIEW, DELETE_REVIEW_ERROR,
    PROFILE_FOLLOWERS_ERROR,
    PROFILE_FOLLOWERS_SUCCESS,
    PROFILE_FOLLOWINGS_ERROR,
    PROFILE_FOLLOWINGS_SUCCESS,
    PROFILE_INFORMATION_ERROR,
    PROFILE_INFORMATION_SUCCESS,
    PROFILE_RATINGS_ERROR,
    PROFILE_RATINGS_SUCCESS, PROFILE_REVIEWS_ERROR,
    PROFILE_REVIEWS_SUCCESS,
    PROFILE_WATCHLIST_ERROR,
    PROFILE_WATCHLIST_SUCCESS,
    USER_FOLLOW_ERROR,
    USER_FOLLOW_SUCCESS,
    USER_UNFOLLOW_ERROR,
    USER_UNFOLLOW_SUCCESS
} from "../actions/types";
import {LOCATION_CHANGE} from "react-router-redux";

const initialState = {
    user: null,
    loadingUser: true,
    watchlist: [],
    ratings: [],
    reviews: [],
    followings: [],
    followers: []
};

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case PROFILE_INFORMATION_SUCCESS:
            return {
                ...state,
                user: payload,
                loadingUser: false
            };
        case PROFILE_INFORMATION_ERROR:
            return {
                ...state,
                user: null,
                loadingUser: true
            };
        case PROFILE_FOLLOWINGS_SUCCESS:
            return {
                ...state,
                followings: payload
            };
        case PROFILE_FOLLOWINGS_ERROR:
            return {
                ...state,
                followings: []
            };
        case PROFILE_FOLLOWERS_SUCCESS:
            return {
                ...state,
                followers: payload
            };
        case PROFILE_FOLLOWERS_ERROR:
            return {
                ...state,
                followers: []
            };
        case PROFILE_WATCHLIST_SUCCESS:
            return {
                ...state,
                watchlist: payload
            };
        case PROFILE_WATCHLIST_ERROR:
            return {
                ...state,
                watchlist: []
            };
        case PROFILE_RATINGS_SUCCESS:
            return {
                ...state,
                ratings: payload
            };
        case PROFILE_RATINGS_ERROR:
            return {
                ...state,
                ratings: []
            };
        case PROFILE_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: payload
            };
        case PROFILE_REVIEWS_ERROR:
            return {
                ...state,
                reviews: []
            };
        case DELETE_REVIEW:
            return {
                ...state,
                reviews: state.reviews.filter( r=> r !== payload  )
            };
        case USER_FOLLOW_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    isFollowing: true
                }
            };
        case USER_UNFOLLOW_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    isFollowing: false
                }
            };
        case USER_FOLLOW_ERROR:
        case USER_UNFOLLOW_ERROR:
        case DELETE_REVIEW_ERROR:
            return state;
        case LOCATION_CHANGE:
            return {
                ...state,
                user: null,
                loadingUser: true,
                watchlist: [],
                ratings: [],
                reviews: [],
                followings: [],
                followers: []
            };
        default:
            return state;
    }
}