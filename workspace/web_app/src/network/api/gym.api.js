import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export function gym_getById(id) {
    return axios.get(Api_url.gym.GET_BY_ID,{params:{id:id}});
}

export function gym_query(data) {
    return axios.post(Api_url.gym.query, data);
}
