import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Plans_getByPlace(place){
    return axios.get(Api_url.plans.GET_BY_PLACE_ID,{params:place})
}

export  function Plans_getById(place){
    return axios.get(Api_url.plans.GET_BY_ID,{params:place})
}



export function planGatesTiming_getByPlan(data) {
    return axios.get(Api_url.PlanGateTimingApi.getByPlan,{ params: data });
}

