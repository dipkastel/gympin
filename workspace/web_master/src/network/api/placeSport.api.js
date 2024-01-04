import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";


//sport
export function placeSport_add(placeSport) {
    return axios.post(Api_url.PlaceSport.add, placeSport);
}
export function placeSport_delete(placeSport) {
    return axios.put(Api_url.PlaceSport.delete,  placeSport );
}
export function placeSport_getAll() {
    return axios.get(Api_url.PlaceSport.getAll);
}
export function placeSport_update(placeSport) {
    return axios.put(Api_url.PlaceSport.update, placeSport);
}

export function placeSport_getSportsByPlace(placeSport) {
    return axios.get(Api_url.PlaceSport.getSportsByPlace, { params: placeSport });
}
