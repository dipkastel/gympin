import axios from "axios";
import {Report} from "./const_api";

export function Report_getPlaceViews(data) {
  return axios.post(Report.getPlaceViews, data);
}

export function Report_getLinkViews(param) {
  return axios.get(Report.getLinkViews,{params:param});
}

export function Report_getSellsByMonth(param) {
  return axios.get(Report.SellsByMonth,{params:param});
}
export function Report_getUseByMonth(param) {
  return axios.get(Report.useByMonth,{params:param});
}
