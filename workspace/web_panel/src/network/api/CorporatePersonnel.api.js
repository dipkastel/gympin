import axios from "axios";
import {CorporatePersonnelApi} from "./const_api";

export function corporatePersonnel_add(data) {
  return axios.post(CorporatePersonnelApi.add, data);
}
export function corporatePersonnel_delete(data) {
  return axios.put(CorporatePersonnelApi.delete, null,{ params: data });
}
export function corporatePersonnel_getAll() {
  return axios.get(CorporatePersonnelApi.getAll);
}
export function corporatePersonnel_getById(param) {
  return axios.get(CorporatePersonnelApi.getById,{params:param});
}
export function corporatePersonnel_getTotalUserCredits(data) {
  return axios.get(CorporatePersonnelApi.getTotalUserCredits,{params: data});
}
export function corporatePersonnel_update(data) {
  return axios.put(CorporatePersonnelApi.update, data);
}
export function corporatePersonnel_ByCorporate(data) {
  return axios.get(CorporatePersonnelApi.PersonnelByCorporate,{params: data});
}
