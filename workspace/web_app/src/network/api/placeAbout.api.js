import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlaceAbout_getByPlace(place){
    return axios.get(Api_url.placeAbout.GET_BY_PLACE_ID,{params:place})
}
