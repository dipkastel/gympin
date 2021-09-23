import axios from "axios";
import {LocationApi} from "./const_api";


//state
export function location_getAllState() {
    return axios.get(LocationApi.getAllState);
}
export function location_addState(state) {
    return axios.post(LocationApi.addState,state);
}
export function location_deleteState(state) {
    return axios.delete(LocationApi.deleteState,{params:state});
}
export function location_updateState(state) {
    return axios.put(LocationApi.updateState,state);
}
//city
export function location_getAllCities() {
    return axios.get(LocationApi.getAllCity);
}
export function location_getCities_byState(state) {
    return axios.get(LocationApi.getCitiesByState,{ params: state });
}
export function location_addCity(city) {
    return axios.post(LocationApi.addCity,city);
}
export function location_deleteCity(city) {
    return axios.delete(LocationApi.deleteCity,{params:city});
}
export function location_updateCity(city) {
    return axios.put(LocationApi.updateCity,city);
}
//region
export function location_getRegions_byCity(city) {
    return axios.get(LocationApi.getRegionsByCity,{ params: city });
}
export function location_addRegion(region) {
    return axios.post(LocationApi.addRegion,region);
}
export function location_deleteRegion(region) {
    return axios.delete(LocationApi.deleteRegion,{params:region});
}
export function location_updateRegion(region) {
    return axios.put(LocationApi.updateRegion,region);
}
//place
export function location_getAllPlaces() {
    return axios.get(LocationApi.getAllPlace);
}
export function location_getPlaceById(place) {
    return axios.get(LocationApi.getPlaceById,{params:place});
}
export function location_addPlace(place) {
    return axios.post(LocationApi.addPlace,place);
}
export function location_deletePlace(place) {
    return axios.delete(LocationApi.deletePlace,{params:place});
}
export function location_updatePlace(place) {
    return axios.put(LocationApi.updatePlace,place);
}
// place clients
export function location_addPlaceOwner(placeOwner) {
    return axios.post(LocationApi.addPlaceOwner,placeOwner);
}
export function location_getOwnersPlace(placeId) {
    return axios.get(LocationApi.getOwnersPlace,{params:placeId});
}






