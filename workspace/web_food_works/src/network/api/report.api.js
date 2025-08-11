import axios from "axios";
import { Api_url } from "./NETWORKCONSTS";

export function Report_useCateringCharge(cateringId) {
  return axios.get(Api_url.report.useCateringCharge, { params: cateringId });
}
