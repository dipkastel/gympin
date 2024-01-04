import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function GatesTraffic_getByGate(gate){
    return axios.get(Api_url.HallTraffic.GET_BY_HALL,{params:gate})
}
export  function GatesTraffic_addAll(traffic){
    return axios.post(Api_url.HallTraffic.ADD,traffic)
}
