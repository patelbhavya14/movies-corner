import {
    GET_CAST,
    GET_CAST_ERROR,
    GET_MOVIE_DETAILS,
    GET_MOVIE_DETAILS_ERROR,
    GET_TRAILER,
    GET_TRAILER_ERROR
} from "../actions/types";

const initialState = {
    movie: null,
    trailer: null,
    cast: [],
    movieLoading: true
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_MOVIE_DETAILS:
            return {
                ...state,
                movie: payload,
                movieLoading: false
            };
        case GET_MOVIE_DETAILS_ERROR:
            return {
                ...state,
                movieLoading: true
            };
        case GET_TRAILER:
            return {
                ...state,
                trailer: payload
            };
        case GET_TRAILER_ERROR:
            return {
                ...state,
                trailer: null
            };
        case GET_CAST:
            return {
                ...state,
                cast: payload
            };
        case GET_CAST_ERROR:
            return {
                ...state,
                cast:[]
            };
        default:
            return state;
    }
}