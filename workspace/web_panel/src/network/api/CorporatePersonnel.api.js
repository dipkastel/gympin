import axios from "axios";
import {CorporatePersonnelApi} from "./const_api";

export function corporatePersonnel_add(data) {
  return axios.post(CorporatePersonnelApi.add, data);
}
export function corporatePersonnel_addPersonnelCredit(data) {
  return axios.post(CorporatePersonnelApi.addPersonnelCredit, data);
}
export function corporatePersonnel_decreaseCredit(data) {
  return axios.post(CorporatePersonnelApi.decreaseCredit, data);
}
export function corporatePersonnel_manualExpireCredit(data) {
  return axios.post(CorporatePersonnelApi.manualExpireCredit, data);
}
export function corporatePersonnel_addList(data) {
  return axios.post(CorporatePersonnelApi.addList, data,{
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}
export function corporatePersonnel_delete(data) {
  return axios.put(CorporatePersonnelApi.delete,  data );
}
export function corporatePersonnel_getAll() {
  return axios.get(CorporatePersonnelApi.getAll);
}
export function corporatePersonnel_getById(param) {
  return axios.get(CorporatePersonnelApi.getById,{params:param});
}
export function corporatePersonnel_getByUser(param) {
  return axios.get(CorporatePersonnelApi.getByUser,{params:param});
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

export function corporate_query(data) {
  return axios.post(CorporatePersonnelApi.query,data);
}

export function corporatePersonnel_addCreditToAll(data) {
  return axios.post(CorporatePersonnelApi.addCreditToAll, data);
}

export function corporatePersonnel_addNWCreditToAll(data) {
  return axios.post(CorporatePersonnelApi.addNWCreditToAll, data);
}
