import axios from "axios";
import {APIKey} from "../config/config";
import {
    GET_NOW_PLAYING_MOVIES_ERROR,
    GET_NOW_PLAYING_MOVIES_SUCCESS,
    GET_POPULAR_MOVIES_ERROR,
    GET_POPULAR_MOVIES_SUCCESS
} from "./types";

// Get Popular movies
export const getPopularMovies = (page) => async dispatch => {
    try {
        const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key="+APIKey+"&page="+page);

        const popularMovies = res.data.results.filter((m, index) => index<12);

        const result = popularMovies.map(
            ({id, title, backdrop_path, release_date}) => ({id, title, backdrop_path, release_date})
        );

        dispatch({
            type: GET_POPULAR_MOVIES_SUCCESS,
            payload: result
        });
    } catch (err) {
        dispatch({
            type: GET_POPULAR_MOVIES_ERROR
        })
    }
};

// Get Now Playing movies
export const getNowPlayingMovies = (page) => async dispatch => {
    try {
        const res = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key="+APIKey+"&page="+page);

        const nowPlayingMovies = res.data.results.filter((m, index) => index<12);

        const result = nowPlayingMovies.map(
            ({id, title, backdrop_path, release_date}) => ({id, title, backdrop_path, release_date})
        );

        dispatch({
            type: GET_NOW_PLAYING_MOVIES_SUCCESS,
            payload: result
        });
    } catch (err) {
        dispatch({
            type: GET_NOW_PLAYING_MOVIES_ERROR
        })
    }
};