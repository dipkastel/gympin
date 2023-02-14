import axios from "axios";
import {SettingsApi} from "./const_api";

export function settings_add(data) {
  return axios.post(SettingsApi.add, data);
}
export function settings_delete(data) {
  return axios.put(SettingsApi.delete, null,{ params: data });
}
export function settings_getAll() {
  return axios.get(SettingsApi.getAll);
}
export function settings_update(data) {
  return axios.put(SettingsApi.update, data);
}
