// we will use this util to set/delete the authorization header for our axios requests depending on if a user is logged in or not 

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};


export default setAuthToken;