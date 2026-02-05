import axios from "axios";
import {Report} from "./const_api";

export function Report_getPlaceViews(data) {
  return axios.post(Report.getPlaceViews, data);
}
