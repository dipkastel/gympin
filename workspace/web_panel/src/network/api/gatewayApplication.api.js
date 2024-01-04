import axios from "axios";
import {GatewayApplicationApi} from "./const_api";


export function GatewayApplication_add(data) {
    return axios.post(GatewayApplicationApi.add, data);
}

export function GatewayApplication_getAll() {
    return axios.get(GatewayApplicationApi.getAll);
}

export function GatewayApplication_update(data) {
    return axios.put(GatewayApplicationApi.update, data);
}

export function GatewayApplication_getById(data) {
    return axios.get(GatewayApplicationApi.getById, {params: data});
}

export function GatewayApplication_query(data) {
    return axios.post(GatewayApplicationApi.query, data);
}

export function GatewayApplication_delete(data) {
    return axios.put(GatewayApplicationApi.delete, data);
}
