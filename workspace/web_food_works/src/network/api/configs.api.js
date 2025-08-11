import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function configs_getCateringSplash(data) {
  return axios.post(Api_url.configs.CateringSplash, data);
}
