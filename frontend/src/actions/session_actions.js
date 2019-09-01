import jwt_decode from "jwt-decode";
import * as APIUtil from "../util/session_api_util";

export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

// Dispatch this when user signs in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

// Dispatch this to redirect user to the login page upon sign up
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

// Dispatch this to show authentication errors
export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch this when user logged out to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch this to sign up
// Either redirect user to login page when successfully signed up
// Or show the authentication errors
export const signup = user => dispatch =>
  APIUtil.signup(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch(err => dispatch(receiveErrors(err.response.data)));

// Dispatch this to login
// Either save the token in the local storage and set token as header in request
// Or show the authentication errors
export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => dispatch(receiveErrors(err.response.data)));

// Dispatch this to logout user
export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem("jwtToken");
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};
