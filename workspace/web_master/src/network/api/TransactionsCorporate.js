import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function transactionCorporate_query(data) {
  return axios.post(Api_url.transactionCorporate.query, data);
}
