import axios from "axios";
import {GateTrafficApi, PlaceAboutApi, PlaceOptionApi, PlaceSportApi, SportApi} from "./const_api";

export function gateTraffic_add(data) {
  return axios.post(GateTrafficApi.add, data);
}
export function gateTraffic_getByGate(data) {
  return axios.get(GateTrafficApi.getByGate,{params:data});
}
