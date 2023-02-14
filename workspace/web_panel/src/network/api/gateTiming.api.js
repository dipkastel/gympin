import axios from "axios";
import {GateTimingApi} from "./const_api";

export function gateTiming_add(data) {
    return axios.post(GateTimingApi.add, data);
}

export function gateTiming_addAll(data) {
    return axios.post(GateTimingApi.addAll, data);
}

export function gateTiming_delete(data) {
    return axios.put(GateTimingApi.delete, null, {params: data});
}

export function gateTiming_getAll() {
    return axios.get(GateTimingApi.getAll);
}

export function gateTiming_update(data) {
    return axios.put(GateTimingApi.update, data);
}

export function gateTiming_getById(data) {
    return axios.get(GateTimingApi.getById, {params: data});
}

export function gateTiming_getByGate(data) {
    return axios.get(GateTimingApi.getByGate, {params: data});
}

export function gateTiming_getByPlace(data) {
    return axios.get(GateTimingApi.getByPlace, {params: data});
}
