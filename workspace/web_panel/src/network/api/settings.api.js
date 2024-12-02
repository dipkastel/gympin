import axios from "axios";
import {SettingsApi} from "./const_api";

export function settings_add(data) {
  return axios.post(SettingsApi.add, data);
}
export function settings_delete(data) {
  return axios.put(SettingsApi.delete,  data );
}
export function settings_getAll() {
  return axios.get(SettingsApi.getAll);
}
export function settings_update(data) {
  return axios.put(SettingsApi.update, data);
}

export function settings_UpdateAutoDiscount() {
  return axios.get(SettingsApi.UpdateAutoDiscount);
}

export function settings_SetAutoToAll() {
  return axios.get(SettingsApi.SetAutoToAll);
}

export function settings_RemoveAllDiscounts() {
  return axios.get(SettingsApi.RemoveAllDiscounts);
}

export function settings_DoMaximumDiscount() {
  return axios.get(SettingsApi.DoMaximumDiscount);
}
