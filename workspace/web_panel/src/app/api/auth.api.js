import axios from "axios";
import {AuthApi} from "./const_api";


export function login(username, password) {

  return axios.get(AuthApi.LOGIN_URL, { auth:{
      username:username,
      password:password
    } });
}
