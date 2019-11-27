import {SEARCH_MOVIES_ERROR, SEARCH_MOVIES_SUCCESS, SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS} from "../actions/types";

const initialState = {
    movies: null,
    users: true,
    loadingMovies: true,
    loadingUsers: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SEARCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loadingUsers: false
            };
        case SEARCH_USERS_ERROR:
            return {
                ...state,
                loadingUsers: true
            };
        case SEARCH_MOVIES_SUCCESS:
            return {
              ...state,
                movies: payload,
                loadingMovies: false
            };
        case SEARCH_MOVIES_ERROR:
            return {
                ...state,
                loadingMovies: true
            };
        default:
            return state;
    }
}