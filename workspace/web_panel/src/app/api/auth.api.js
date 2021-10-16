import axios from "axios";
import {AuthApi} from "./const_api";


export function login(loginData) {

  return axios.post(AuthApi.LOGIN_URL, loginData);
}
