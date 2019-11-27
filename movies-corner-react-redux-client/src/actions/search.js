import axios from "axios";
import {SEARCH_USERS_ERROR, SEARCH_USERS_SUCCESS} from "./types";

// search users
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