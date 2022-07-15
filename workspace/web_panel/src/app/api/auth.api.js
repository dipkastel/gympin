import axios from "axios";
import { AuthApi } from "./const_api";

export function login(loginData) {
  return axios.post(AuthApi.LOGIN_URL, loginData);
}

export function sendSms(userdata) {
  return axios.post(AuthApi.SEND_SMS_URL, userdata);
}
