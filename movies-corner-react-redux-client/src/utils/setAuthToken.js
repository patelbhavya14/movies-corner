import axios from 'axios';

const setAuthToken = (token) => {
  if(token) {
      const config = {
          headers: {
              'Authorization': token
          }
      };
  } else {
      delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;