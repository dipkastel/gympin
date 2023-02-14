import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Gates_getByPlace(place){
    return axios.get(Api_url.Gates.GET_BY_PLACE_ID,{params:place})
}
export  function Gates_getById(place){
    return axios.get(Api_url.Gates.GET_BY_ID,{params:place})
}
export  function Gates_add(data){
    return axios.post(Api_url.Gates.ADD,data)
}
export  function Gates_delete(data){
    return axios.put(Api_url.Gates.DELETE,null,{params:data})
}
export  function Gates_update(data){
    return axios.put(Api_url.Gates.UPDATE,data)
}

