import {GET_NOW_PLAYING_MOVIES_SUCCESS, GET_POPULAR_MOVIES_SUCCESS} from "../actions/types";

const initialState = {
    popularMovies: [],
    nowplayingMovies: [],
    loadingpopularMovies: true,
    loadingnowplayingMovies: true,
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_POPULAR_MOVIES_SUCCESS:
            return {
                ...state,
                popularMovies: payload,
                loadingpopularMovies: false
            };
        case GET_NOW_PLAYING_MOVIES_SUCCESS:
            return {
                ...state,
                nowplayingMovies: payload,
                loadingnowplayingMovies: false
            };
        default:
            return state;
    }
}