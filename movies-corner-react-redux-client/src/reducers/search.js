import {SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS} from "../actions/types";

const initialState = {
    movies: null,
    users: true,
    loading: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case SEARCH_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case SEARCH_USERS_ERROR:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}