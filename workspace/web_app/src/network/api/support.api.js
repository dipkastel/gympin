import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export  function Support_add(data){
    return axios.post(Api_url.support.ADD,data)
}

export  function Support_addMessage(data){
    return axios.post(Api_url.support.ADD_MESSAGE,data)
}

export  function Support_getAll(place){
    return axios.get(Api_url.support.GET_BY_PLACE,{params:place})
}

export  function Support_getById(support){
    return axios.get(Api_url.support.GET_BY_ID,{params:support})
}

export  function Support_setMessagesRead(support){
    return axios.get(Api_url.support.setMessagesRead,{params:support})
}

export  function Support_getCorporateSupportCount(support){
    return axios.get(Api_url.support.getCorporateSupportCount,{params:support})
}

export function Support_query(data) {
    return axios.post(Api_url.support.query, data);
}
