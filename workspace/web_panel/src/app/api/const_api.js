


export let AuthApi = {
      LOGIN_URL : "v1/user/loginpanel"
}

export let LocationApi = {
    //state
    addState : "v1/location/addState",
    getAllState : "v1/location/getAllState",
    updateState : "v1/location/updateState",
    deleteState : "v1/location/deleteState",
    //city
    addCity : "v1/location/addCity",
    getAllCity : "v1/location/getAllCity",
    getCitiesByState : "v1/location/getCitiesByState",
    deleteCity : "v1/location/deleteCity",
    updateCity : "v1/location/updateCity",
    //region
    getRegionsByCity : "v1/location/getRegionsByCity",
    addRegion : "v1/location/addRegion",
    deleteRegion : "v1/location/deleteRegion",
    updateRegion : "v1/location/updateRegion",
    //place
    getAllPlace : "v1/location/getAllPlace",
    addPlace : "v1/location/addPlace",
    deletePlace : "v1/location/deletePlace",
    updatePlace : "v1/location/updatePlace",
}
