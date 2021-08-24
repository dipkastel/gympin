import axios from "axios";
import {LocationApi} from "./const_api";



export function location_getAllState() {
    return axios.get(LocationApi.getAllState);
}

export function location_getAllCities() {
    return axios.get(LocationApi.getAllCity);
}
export function location_getCities_byState(state) {
    return axios.get(LocationApi.getCitiesByState,{ params: state });
}
export function location_getRegions_byCity(city) {
    return axios.get(LocationApi.getRegionsByCity,{ params: city });
}
export function location_addState(state) {
    return axios.post(LocationApi.addState,state);
}

export function location_addCity(city) {
    return axios.post(LocationApi.addCity,city);
}

export function location_addRegion(region) {
    return axios.post(LocationApi.addRegion,region);
}
