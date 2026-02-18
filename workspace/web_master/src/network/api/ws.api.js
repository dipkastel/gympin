import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function ws_query(data) {
  return axios.post(Api_url.ws.query, data);
}
