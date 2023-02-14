import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function Places_getPlacesByUserId(id){
    return axios.get(Api_url.place.GET_PLACES_BY_USER,{params:{id:id}})
}


export  function place_getById(id){
    return axios.get(Api_url.place.GET_BY_ID,{params:{id:id}})
}

export  function place_changeStatus(place){
    return axios.put(Api_url.place.CHANGE_STATUS,place)
}


export  function place_getMultimedias(placeId){
    return axios.get(Api_url.place.GET_MULTIMEDIAS,{params:{id:placeId}})
}


export  function place_AddMultimedia(data){
    return axios.post(Api_url.place.ADD_MULTIMEDIA,data)
}


export  function Place_deleteMultimedia(data){
    return axios.put(Api_url.place.DELETE_MULTIMEDIA,data)
}

export  function Place_update(data){
    return axios.put(Api_url.place.UPDATE,data)
}
