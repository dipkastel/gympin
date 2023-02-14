import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlanGatesTiming_getByPlan(plan){
    return axios.get(Api_url.PlanGatesTiming.GET_BY_PLAN,{params:plan})
}

export  function PlanGatesTiming_addAll(data){
    return axios.post(Api_url.PlanGatesTiming.ADD_ALL,data)
}


export  function PlanGatesTiming_delete(data){
    return axios.put(Api_url.PlanGatesTiming.DELETE,null,{params:data})
}
