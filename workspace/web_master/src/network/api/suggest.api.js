import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function suggest_query(data) {
  return axios.post(Api_url.suggest.query, data);
}
