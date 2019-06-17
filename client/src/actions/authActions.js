import axios from "axios";
import setAuthToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
        console.log(res);
        history.push("/login")      // re-direct to login on successful register
    })    
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user in - get decoded jwt user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode JWT token to get user data
      const decoded = jwt_decode(token);

      // Set current user with the decoded userData - dispatch this action to our authReducer
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decodedJWTPayload => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedJWTPayload
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);
  
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};