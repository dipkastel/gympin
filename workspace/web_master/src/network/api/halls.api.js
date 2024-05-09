import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Halls_getByPlace(place){
    return axios.get(Api_url.Halls.GET_BY_PLACE_ID,{params:place})
}
export  function Halls_getById(place){
    return axios.get(Api_url.Halls.GET_BY_ID,{params:place})
}
export  function Halls_add(data){
    return axios.post(Api_url.Halls.ADD,data)
}
export  function Halls_delete(data){
    return axios.put(Api_url.Halls.DELETE,data)
}
export  function Halls_update(data){
    return axios.put(Api_url.Halls.UPDATE,data)
}

