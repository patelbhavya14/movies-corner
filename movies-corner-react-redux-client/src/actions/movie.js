import axios from "axios";
import {APIKey} from "../config/config";
import {
    GET_CAST,
    GET_CAST_ERROR,
    GET_MOVIE_DETAILS,
    GET_MOVIE_DETAILS_ERROR,
    GET_TRAILER,
    GET_TRAILER_ERROR
} from "./types";

// Get movie details
export const getMovieDetails = (movieId) => async dispatch => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKey}`);

        const movie = (
            ({ id, title, overview, backdrop_path, genres, poster_path, release_date, runtime }) =>
                ({ id, title, overview, backdrop_path, genres, poster_path, release_date, runtime })
        )(res.data);

        dispatch({
            type: GET_MOVIE_DETAILS,
            payload: movie
        });
    } catch (err) {
        dispatch({
            type: GET_MOVIE_DETAILS_ERROR
        });
    }
};

// Get trailer
export const getTrailer = (movieId) => async dispatch => {
  try {
      const trailer = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKey}`);
      const result = trailer.data.results[0].key;
      dispatch({
          type: GET_TRAILER,
          payload: result
      });
  } catch(err) {
      dispatch({
          type: GET_TRAILER_ERROR
      });
  }
};

// Get movie cast
export const getMovieCast = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKey}`);

        let cast = res.data.cast.filter((c) => c.order < 4);
        dispatch({
            type: GET_CAST,
            payload: cast
        });
    } catch(err) {
        dispatch({
            type: GET_CAST_ERROR
        });
    }
};