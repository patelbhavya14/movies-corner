import axios from "axios";
import { APIKey, tmdbURL } from "../config/config";
import {
  GET_NOW_PLAYING_MOVIES_ERROR,
  GET_NOW_PLAYING_MOVIES_SUCCESS,
  GET_POPULAR_MOVIES_ERROR,
  GET_POPULAR_MOVIES_SUCCESS,
} from "./types";

// Get Popular movies
export const getPopularMovies = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${tmdbURL}/movie/popular?api_key=${APIKey}&page=${page}`
    );

    const popularMovies = res.data.results.filter((m, index) => index < 6);

    const result = popularMovies.map(
      ({ id, title, backdrop_path, poster_path, release_date }) => ({
        id,
        title,
        backdrop_path,
        poster_path,
        release_date,
      })
    );

    dispatch({
      type: GET_POPULAR_MOVIES_SUCCESS,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: GET_POPULAR_MOVIES_ERROR,
    });
  }
};

// Get Now Playing movies
export const getNowPlayingMovies = (page) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${tmdbURL}/movie/now_playing?api_key=${APIKey}&page=${page}`
    );

    const nowPlayingMovies = res.data.results.filter((m, index) => index < 6);

    const result = nowPlayingMovies.map(
      ({ id, title, backdrop_path, poster_path, release_date }) => ({
        id,
        title,
        backdrop_path,
        poster_path,
        release_date,
      })
    );

    dispatch({
      type: GET_NOW_PLAYING_MOVIES_SUCCESS,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: GET_NOW_PLAYING_MOVIES_ERROR,
    });
  }
};
