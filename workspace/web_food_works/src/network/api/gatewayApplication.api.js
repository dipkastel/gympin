import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function gatewayApplication_query(data) {
  return axios.post(Api_url.gatewayApplication.query, data);
}
