import axios from "axios";

export const LOGIN_URL = "v1/user/loginpanel";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "api/me";



// const api = setupAxios2(axios);

export function login(username, password) {

  return axios.get(LOGIN_URL, { auth:{
      username:username,
      password:password
    } });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
