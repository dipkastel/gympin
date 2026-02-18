import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function gateways_getPaymentGateways(data) {
  return axios.get(Api_url.gateway.getPaymentGateways, { params: data });
}
