import axios from "axios";
import {wsApi} from "./const_api";


export function ws_query(data) {
    return axios.post(wsApi.query, data);
}


export function ws_getSessionList() {
    return axios.get(wsApi.getSessionList);
}

