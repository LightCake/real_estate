import axios from "axios";

// Either insert or delete the token into/from the header of the request
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Send user data to the register endpoint of the api
export const signup = userData => {
  return axios.post("/api/users/register", userData);
};

// Send user data to the login endpoint of the api
export const login = userData => {
  return axios.post("/api/users/login", userData);
};
