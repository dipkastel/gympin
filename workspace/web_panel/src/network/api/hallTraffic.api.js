import axios from "axios";
import {HallTrafficApi} from "./const_api";

export function hallTraffic_add(data) {
    return axios.post(HallTrafficApi.add, data);
}

export function hallTraffic_getByHall(data) {
    return axios.get(HallTrafficApi.getByHall, {params: data});
}
