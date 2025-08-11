import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export function placePersonnel_add(data) {
  return axios.post(Api_url.PlacePersonel.add, data);
}
export function placePersonnel_delete(data) {
  return axios.put(Api_url.PlacePersonel.delete,  data );
}
export function placePersonnel_getAll() {
  return axios.get(Api_url.PlacePersonel.getAll);
}
export function placePersonnel_update(data) {
  return axios.put(Api_url.PlacePersonel.update, data);
}
export function placePersonnel_ByPlace(data) {
  return axios.get(Api_url.PlacePersonel.PersonnelByPlace,{params: data});
}

export function placePersonnel_PersonnelByUser(data) {
  return axios.get(Api_url.PlacePersonel.PersonnelByUser,{params: data});
}

export function placePersonnel_CateringPersonnelByUser(data) {
  return axios.get(Api_url.PlacePersonel.CateringPersonnelByUser,{params: data});
}

export function placePersonnel_GymPersonnelByUser(data) {
  return axios.get(Api_url.PlacePersonel.GymPersonnelByUser,{params: data});
}

export function placePersonnel_getById(data) {
  return axios.get(Api_url.PlacePersonel.getById,{params: data});
}


export function placePersonnel_getAccess(data) {
  return axios.get(Api_url.PlacePersonel.getUserPlaceAccess, {params: data});
}

export function placePersonnel_updatePersonnelAccess(data) {
  return axios.post(Api_url.PlacePersonel.updatePersonnelAccess,  data);
}

export function placePersonnel_updatePersonnelCommissionFee(data) {
  return axios.post(Api_url.PlacePersonel.updatePersonnelCommissionFee,  data);
}


export function placePersonnel_getBuyableAccess(data) {
  return axios.get(Api_url.PlacePersonel.getUserPlaceBuyableAccess, {params: data});
}

export function placePersonnel_getPlaceBeneficiaries(data) {
  return axios.get(Api_url.PlacePersonel.getPlaceBeneficiaries, {params: data});
}

export function placePersonnel_updatePersonnelBuyableAccess(data) {
  return axios.post(Api_url.PlacePersonel.updatePersonnelBuyableAccess,  data);
}

export function placePersonnel_addRole(data) {
  return axios.post(Api_url.PlacePersonel.addRole,  data);
}

export function placePersonnel_deleteRole(data) {
  return axios.post(Api_url.PlacePersonel.deleteRole,  data);
}
