import axios from "axios";
import {HallsApi, SerialApi, SubscribeApi, TransactionAllApi} from "./const_api";

//subscribe
export function serial_query(data) {
    return axios.post(SerialApi.query, data);
}


export function serial_getBySerial(data) {
    return axios.get(SerialApi.getBySerial,{ params: data });
}
