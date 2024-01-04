import axios from "axios";
import { AuthApi } from "./const_api";

export function account_login(loginData) {
  return axios.post(AuthApi.LOGIN_URL, loginData);
}

export function account_sendSms(userdata) {
  return axios.post(AuthApi.SEND_SMS_URL, userdata);
}

export function account_registerUser(userdata) {
  return axios.post(AuthApi.register, userdata);
}
export function account_registerByInviteCode(userdata) {
  return axios.post(AuthApi.registerByInviteCode, userdata);
}

export function refreshToken(refreshToken) {
  return axios.post(AuthApi.REFRESH_TOKEN, {RefreshToken:refreshToken});
}

