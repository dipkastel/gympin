import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function corporatePersonnel_add(data) {
  return axios.post(Api_url.CorporatePersonnel.add, data);
}
export function corporatePersonnel_delete(data) {
  return axios.put(Api_url.CorporatePersonnel.delete, data );
}
export function corporatePersonnel_getAll() {
  return axios.get(Api_url.CorporatePersonnel.getAll);
}
export function corporatePersonnel_corporateOwnedByUserId(data) {
  return axios.get(Api_url.CorporatePersonnel.corporateOwnedByUserId,{params: data});
}
export function corporatePersonnel_getById(data) {
  return axios.get(Api_url.CorporatePersonnel.getById,{params: data});
}
export function corporatePersonnel_update(data) {
  return axios.put(Api_url.CorporatePersonnel.update, data);
}
export function corporatePersonnel_ByCorporate(data) {
  return axios.get(Api_url.CorporatePersonnel.PersonnelByCorporate,{params: data});
}
export function corporatePersonnel_query(data) {
  return axios.post(Api_url.CorporatePersonnel.query,data);
}
export function corporatePersonnel_getTotalUserCredits(data) {
  return axios.get(Api_url.CorporatePersonnel.getTotalUserCredits,{params: data});
}
export function corporatePersonnel_addPersonnelCredit(data) {
  return axios.post(Api_url.CorporatePersonnel.addPersonnelCredit, data);
}
export function corporatePersonnel_manualExpireCredit(data) {
  return axios.post(Api_url.CorporatePersonnel.manualExpireCredit, data);
}
export function corporatePersonnel_addCreditToAll(data) {
  return axios.post(Api_url.CorporatePersonnel.addCreditToAll, data);
}
