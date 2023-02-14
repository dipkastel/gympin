import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


export  function PlaceOptions_getByPlace(place){
    return axios.get(Api_url.optionOfPlace.GET_BY_PLACE_ID,{params:place})
}
