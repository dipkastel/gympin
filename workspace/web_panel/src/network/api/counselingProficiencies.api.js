import axios from "axios";
import {CounselingProficienciesApi, PlaceSportApi} from "./const_api";

//sport
export function counselingProficiencies_add(param) {
  return axios.post(CounselingProficienciesApi.add, param);
}

export function counselingProficiencies_delete(param) {
  return axios.put(CounselingProficienciesApi.delete,  param );
}

export function counselingProficiencies_getAll() {
  return axios.get(CounselingProficienciesApi.getAll);
}

export function counselingProficiencies_update(param) {
  return axios.put(CounselingProficienciesApi.update, param);
}

export function counselingProficiencies_getCounselingProficiencies(param) {
  return axios.get(CounselingProficienciesApi.getCounselingProficiencies, { params: param });
}
