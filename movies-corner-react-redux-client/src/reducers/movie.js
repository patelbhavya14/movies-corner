import {
    ADD_RATING,
    ADD_WATCHLIST,
    ADD_WATCHLIST_ERROR, DELETE_RATING,
    GET_CAST,
    GET_CAST_ERROR,
    GET_MOVIE_DETAILS,
    GET_MOVIE_DETAILS_ERROR,
    GET_RATINGS,
    GET_RATINGS_ERROR,
    GET_TRAILER,
    GET_TRAILER_ERROR,
    GET_USER_RATING_FOR_MOVIE, GET_USER_RATING_FOR_MOVIE_ERROR,
    IS_WATCHLIST,
    IS_WATCHLIST_ERROR,
    REMOVE_WATCHLIST,
    REMOVE_WATCHLIST_ERROR, UPDATE_RATING
} from "../actions/types";
import {isWatchList} from "../actions/movie";

const initialState = {
    movie: null,
    trailer: null,
    cast: [],
    isWatchlist: null,
    ratings: {
        avgRating: null,
        avgLoading: true,
        userRating: null,
        userRatingLoading: true,
        ratingAction: null,
    },
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
        case GET_RATINGS:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    avgRating: payload,
                    avgLoading: false
                }
            };
        case GET_RATINGS_ERROR:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    avgRating: null,
                    avgLoading: true
                }
            };
        case GET_USER_RATING_FOR_MOVIE:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    userRating: payload.rating,
                    ratingAction: payload.action,
                    userRatingLoading: false
                }
            };
        case GET_USER_RATING_FOR_MOVIE_ERROR:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    userRating: null,
                    userRatingLoading: false
                }
            };
        case ADD_RATING:
        case UPDATE_RATING:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    userRating: payload,
                    ratingAction: "update"
                }
            };
        case DELETE_RATING:
            return {
                ...state,
                ratings: {
                    ...state.ratings,
                    userRating: 0,
                    ratingAction: "add"
                }
            };
        default:
            return state;
    }
}