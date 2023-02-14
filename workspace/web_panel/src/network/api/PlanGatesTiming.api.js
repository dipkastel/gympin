import axios from "axios";
import {GatesApi, optionOfPlaceApi, PlaceOptionApi, PlaceSportApi, PlanGateTimingApi, SportApi} from "./const_api";

export function planGatesTiming_add(data) {
  return axios.post(PlanGateTimingApi.add, data);
}
export function planGatesTiming_addAll(data) {
  return axios.post(PlanGateTimingApi.addAll, data);
}
export function planGatesTiming_delete(data) {
  return axios.put(PlanGateTimingApi.delete, null,{ params: data });
}
export function planGatesTiming_getAll() {
  return axios.get(PlanGateTimingApi.getAll);
}
export function planGatesTiming_update(data) {
  return axios.put(PlanGateTimingApi.update, data);
}
export function planGatesTiming_getById(data) {
  return axios.get(PlanGateTimingApi.getById,{ params: data });
}

export function planGatesTiming_getByPlan(data) {
  return axios.get(PlanGateTimingApi.getByPlan,{ params: data });
}
