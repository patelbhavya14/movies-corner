import axios from "axios";
import {APIKey} from "../config/config";
import {
    ADD_RATING, ADD_RATING_ERROR, ADD_REVIEW, ADD_REVIEW_ERROR,
    ADD_WATCHLIST,
    ADD_WATCHLIST_ERROR, DELETE_RATING, DELETE_RATING_ERROR,
    GET_CAST,
    GET_CAST_ERROR,
    GET_MOVIE_DETAILS,
    GET_MOVIE_DETAILS_ERROR, GET_MOVIE_REVIEWS, GET_MOVIE_REVIEWS_ERROR,
    GET_RATINGS,
    GET_RATINGS_ERROR,
    GET_TRAILER,
    GET_TRAILER_ERROR,
    GET_USER_RATING_FOR_MOVIE, GET_USER_RATING_FOR_MOVIE_ERROR,
    IS_WATCHLIST,
    IS_WATCHLIST_ERROR,
    REMOVE_WATCHLIST,
    REMOVE_WATCHLIST_ERROR, UPDATE_RATING, UPDATE_RATING_ERROR
} from "./types";
import {setAuthToken} from "../utils/setAuthToken";

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

// Check if movie is in user's watchlist
export const isWatchList = (id, name, image) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        const res = await axios.post(`http://localhost:8080/MoviesCorner/api/movies/watchlist`, body, setAuthToken());
        dispatch({
            type: IS_WATCHLIST,
            payload: res.data.message
        });
    } catch(err) {
        dispatch({
            type: IS_WATCHLIST_ERROR
        });
    }
};

// Add movie to watchlist
export const addToWatchList = (id, name, image) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        await axios.post(`http://localhost:8080/MoviesCorner/api/movies/watchlist/add`, body, setAuthToken());

        dispatch({
            type: ADD_WATCHLIST
        });
    } catch(err) {
        dispatch({
            type: ADD_WATCHLIST_ERROR
        });
    }
};

// Remove movie from watchlist
export const removeFromWatchList = (id, name, image) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        await axios.post(`http://localhost:8080/MoviesCorner/api/movies/watchlist/remove`, body, setAuthToken());

        dispatch({
            type: REMOVE_WATCHLIST
        });
    } catch(err) {
        dispatch({
            type: REMOVE_WATCHLIST_ERROR
        });
    }
};

// Get Ratings
export const getRatings = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/movies/ratings/get/${id}`);

        dispatch({
            type: GET_RATINGS,
            payload: res.data.message
        })
    } catch(err) {
        dispatch({
           type: GET_RATINGS_ERROR
        });
    }
};

// Get user rating for movie
export const getUserRatingForMovie = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/MoviesCorner/api/movies/ratings/users/get/${id}`, setAuthToken());

        dispatch({
            type: GET_USER_RATING_FOR_MOVIE,
            payload: res.data
        })
    } catch(err) {
        console.log("ERROR IS="+JSON.stringify(err));
        dispatch({
            type: GET_USER_RATING_FOR_MOVIE_ERROR
        });
    }
};

// Add rating
export const addRating = (id, name, image, rating) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        await axios.post(`http://localhost:8080/MoviesCorner/api/movies/ratings/add/${rating}`, body, setAuthToken());
        dispatch({
            type: ADD_RATING,
            payload: rating
        });
    } catch (err) {
        dispatch({
            type: ADD_RATING_ERROR
        });
    }
};

// Update rating for movie
export const updateRating = (id, name, image, rating) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        await axios.post(`http://localhost:8080/MoviesCorner/api/movies/ratings/update/${rating}`, body, setAuthToken());
        dispatch({
            type: UPDATE_RATING,
            payload: rating
        });
    } catch (err) {
        dispatch({
            type: UPDATE_RATING_ERROR
        });
    }
};

// Delete rating for movie
export const deleteRating = (id, name, image) => async dispatch => {
    try {
        let body = {
            movieId: id,
            movieName: name,
            movieImage: image
        };
        await axios.post(`http://localhost:8080/MoviesCorner/api/movies/ratings/delete`, body, setAuthToken());
        dispatch({
            type: DELETE_RATING
        });
    } catch (err) {
        dispatch({
            type: DELETE_RATING_ERROR
        });
    }
};

// Add review
export const addReview = (id, title, image, review) => async dispatch => {
  try {
      let body = {
          movieId: id,
          movieName: title,
          movieImage: image,
          review: review
      };
      const res = await axios.post(`http://localhost:8080/MoviesCorner/api/movies/reviews/add`, body, setAuthToken());

      dispatch({
          type: ADD_REVIEW,
          payload: res.data
      });
  } catch(err) {
      dispatch({
          type: ADD_REVIEW_ERROR
      })
  }
};

// Get reviews
export const getReviews = (movieId) => async dispatch => {
  try {
      const res = await axios.get(`http://localhost:8080/MoviesCorner/api/movies/reviews/${movieId}`);
      dispatch({
         type: GET_MOVIE_REVIEWS,
         payload: res.data
      });
  } catch(err) {
      dispatch({
         type: GET_MOVIE_REVIEWS_ERROR
      });
  }
};