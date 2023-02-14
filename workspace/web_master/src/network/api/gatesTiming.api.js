import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function GatesTiming_getByGate(gate){
    return axios.get(Api_url.GateTiming.GET_BY_GATE,{params:gate})
}
export  function GatesTiming_getByPlace(place){
    return axios.get(Api_url.GateTiming.GET_BY_PLACE,{params:place})
}
export  function GatesTiming_addAll(timings){
    return axios.post(Api_url.GateTiming.ADD_ALL,timings)
}

export  function GatesTiming_delete(timing){
    return axios.put(Api_url.GateTiming.DELETE,null,{params:timing})
}
