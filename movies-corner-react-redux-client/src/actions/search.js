import axios from "axios";
import {SEARCH_MOVIES_ERROR, SEARCH_MOVIES_SUCCESS, SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS} from "./types";

// Search users
export const searchUsers = (userName) => async dispatch => {
  try {
      const res = await axios.get(`http://localhost:8080/MoviesCorner/api/users/search/${userName}`);

      dispatch({
         type: SEARCH_USERS_SUCCESS,
         payload: res.data
      });
  } catch(err) {
        dispatch({
            type: SEARCH_USERS_ERROR
        });
  }
};

// Search Movies
export const searchMovies = (query) => async dispatch => {
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b8dbc7e27dc18f2381bf0f22b65c0f5c&query=${query}&page=1`);

        const result = res.data.results.map(
            ({id, title, backdrop_path, overview}) => ({id, title, backdrop_path, overview})
        );

        dispatch({
            type: SEARCH_MOVIES_SUCCESS,
            payload: result
        });

    } catch(err) {
        dispatch({
            type: SEARCH_MOVIES_ERROR
        });
    }
};