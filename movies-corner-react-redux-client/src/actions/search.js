import axios from "axios";
import {
  SEARCH_MOVIES_ERROR,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_USERS_ERROR,
  SEARCH_USERS_SUCCESS,
} from "./types";
import { APIKey, tmdbURL, springURL } from "../config/config";

// Search users
export const searchUsers = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`${springURL}/users/search/${userName}`);

    dispatch({
      type: SEARCH_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_USERS_ERROR,
    });
  }
};

// Search Movies
export const searchMovies = (query) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${tmdbURL}/movie?api_key=${APIKey}&query=${query}&page=1`
    );

    const result = res.data.results.map(
      ({ id, title, backdrop_path, overview }) => ({
        id,
        title,
        backdrop_path,
        overview,
      })
    );

    dispatch({
      type: SEARCH_MOVIES_SUCCESS,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_MOVIES_ERROR,
    });
  }
};
