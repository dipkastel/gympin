import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlacesQr_getByPlace(place){
    return axios.get(Api_url.placeQR.GET_BY_PLACE_ID,{params:place})
}

export  function PlacesQr_add(placeQr){
    return axios.post(Api_url.placeQR.ADD,placeQr)
}


export  function PlacesQr_delete(placeQr){
    return axios.put(Api_url.placeQR.DELETE,placeQr)
}

