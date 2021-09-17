import axios from "axios";
import { SportApi} from "./const_api";


//sport
export function sport_addSport(sport) {
    return axios.post(SportApi.addSport,sport);
}
export function sport_deleteSport(sport) {
    return axios.delete(SportApi.deleteSport,{params:sport});
}
export function sport_getAllSport() {
    return axios.get(SportApi.getAllSport);
}
export function sport_getSportById(sport) {
    return axios.get(SportApi.getSportById,{params:sport});
}
export function sport_updateSport(sport) {
    return axios.put(SportApi.updateSport,sport);
}







