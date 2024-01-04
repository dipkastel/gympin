import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlaceAbout_getByPlace(place){
    return axios.get(Api_url.placeAbout.getByPlaceId,{params:place})
}

export  function PlaceAbout_getAllAboutByPlaces(places){
    return axios.post(Api_url.placeAbout.getAllAboutByPlaces,places)
}
