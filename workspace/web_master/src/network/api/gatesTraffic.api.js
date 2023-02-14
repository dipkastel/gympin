import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function GatesTraffic_getByGate(gate){
    return axios.get(Api_url.GateTraffic.GET_BY_GATE,{params:gate})
}
export  function GatesTraffic_addAll(traffic){
    return axios.post(Api_url.GateTraffic.ADD,traffic)
}
