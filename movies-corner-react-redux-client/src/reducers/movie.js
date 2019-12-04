import {
    ADD_WATCHLIST, ADD_WATCHLIST_ERROR,
    GET_CAST,
    GET_CAST_ERROR,
    GET_MOVIE_DETAILS,
    GET_MOVIE_DETAILS_ERROR,
    GET_TRAILER,
    GET_TRAILER_ERROR, IS_WATCHLIST, IS_WATCHLIST_ERROR, REMOVE_WATCHLIST, REMOVE_WATCHLIST_ERROR
} from "../actions/types";
import {isWatchList} from "../actions/movie";

const initialState = {
    movie: null,
    trailer: null,
    cast: [],
    isWatchlist: null,
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
        case IS_WATCHLIST:
            return {
                ...state,
                isWatchlist: payload
            };
        case IS_WATCHLIST_ERROR:
            return {
                ...state,
                isWatchlist: 'false'
            };
        case ADD_WATCHLIST:
            return {
                ...state,
                isWatchlist: 'true'
            };
        case REMOVE_WATCHLIST:
            return {
                ...state,
                isWatchlist: 'false'
            };
        case ADD_WATCHLIST_ERROR:
        case REMOVE_WATCHLIST_ERROR:
            return state;
        default:
            return state;
    }
}