import axios from "axios";
import {GatewayApi} from "./const_api";


export function Gateway_add(data) {
    return axios.post(GatewayApi.add, data);
}

export function Gateway_getAll() {
    return axios.get(GatewayApi.getAll);
}

export function Gateway_update(data) {
    return axios.put(GatewayApi.update, data);
}

export function Gateway_getById(data) {
    return axios.get(GatewayApi.getById, {params: data});
}

export function Gateway_query(data) {
    return axios.post(GatewayApi.query, data);
}


export function Gateway_updateImage(data) {
    return axios.post(GatewayApi.updateImage, data);
}

export function Gateway_delete(data) {
    return axios.put(GatewayApi.delete,  data );
}
