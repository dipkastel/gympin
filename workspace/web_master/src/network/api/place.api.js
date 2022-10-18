import axios from "axios";
import {Api_url} from "../const/NETWORKCONSTS";

export function getMyPlace(user) {
    return axios.get(Api_url.place.GET_OWNERS_PLACE);
}

export  function addPlace(place){
    return axios.post(Api_url.place.add,place)
}

export  function getAllPlaces(user){
    return axios.get(Api_url.place.GET_ALL)
}


export  function getplaceById(id){
    return axios.get(Api_url.place.GET_BY_ID,{params:{id:id}})
}


export  function updatePlace(data){
    return axios.put(Api_url.place.UPDATE,data)
}
