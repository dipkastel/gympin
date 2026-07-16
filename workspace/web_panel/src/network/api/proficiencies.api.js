import axios from "axios";
import {ProficienciesApi} from "./const_api";

//proficiencies
export function proficiencies_addProficiencies(proficiencies) {
  return axios.post(ProficienciesApi.add, proficiencies);
}
export function proficiencies_deleteProficiencies(proficiencies) {
  return axios.put(ProficienciesApi.delete,  proficiencies )
}
export function proficiencies_getAllProficiencies() {
  return axios.get(ProficienciesApi.getAll);
}
export function proficiencies_query(data) {
  return axios.post(ProficienciesApi.query, data);
}

export function proficiencies_getProficienciesById(proficiencies) {
  return axios.get(ProficienciesApi.getById, { params: proficiencies });
}
export function proficiencies_updateProficiencies(proficiencies) {
  return axios.put(ProficienciesApi.update, proficiencies);
}
