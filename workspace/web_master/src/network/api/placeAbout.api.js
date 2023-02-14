import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlaceAbout_getByPlace(place){
    return axios.get(Api_url.placeAbout.GET_BY_PLACE_ID,{params:place})
}

export  function PlaceAbout_add(data){
    return axios.post(Api_url.placeAbout.ADD,data)
}


export  function PlaceAbout_delete(data){
    return axios.put(Api_url.placeAbout.DELETE,null,{params:data})
}


export  function PlaceAbout_update(data){
    return axios.put(Api_url.placeAbout.UPDATE,data)
}

