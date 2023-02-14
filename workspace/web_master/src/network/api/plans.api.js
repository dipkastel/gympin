import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Plans_getByPlace(place){
    return axios.get(Api_url.placePlans.GET_BY_PLACE_ID,{params:place})
}

export  function Plans_getById(place){
    return axios.get(Api_url.placePlans.GET_BY_ID,{params:place})
}

export  function Plans_add(data){
    return axios.post(Api_url.placePlans.ADD,data)
}


export  function Plans_delete(data){
    return axios.put(Api_url.placePlans.DELETE,null,{params:data})
}


export  function Plans_update(data){
    return axios.put(Api_url.placePlans.UPDATE,data)
}

