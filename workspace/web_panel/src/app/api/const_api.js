export let AuthApi = {
       BASEURL : "http://api.gympin.ir/",
      // BASEURL : "http://localhost:8080/api/",
      LOGIN_URL : "v1/account/loginpanel"
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
    getPlaceById : "v1/location/getPlaceById",
    addPlace : "v1/location/addPlace",
    deletePlace : "v1/location/deletePlace",
    updatePlace : "v1/location/updatePlace",
    //place client
    addPlaceOwner : "v1/location/addPlaceOwner",
    getOwnersPlace : "v1/location/getOwnersPlace",

}

export let SportApi = {
    //sport
    addSport : "v1/sport/addSport",
    deleteSport : "v1/sport/deleteSport",
    getAllSport : "v1/sport/getAllSport",
    getSportById : "v1/sport/getSportById",
    updateSport : "v1/sport/updateSport",

}



export let UserApi = {
    //sport
    add : "v1/user/add",
    delete : "v1/user/delete",
    getAll : "v1/user/getall",
    getById : "v1/user/getById",
    update : "v1/user/update",

}



export let MultimediaApi = {
    //multimedia
    add : "v1/multimedia/add",
    addImage : "v1/multimedia/addImage",
    addAudio : "v1/multimedia/addAudio",
    addVideo : "v1/multimedia/addVideo",
    getAllByType : "v1/multimedia/getAllByType",
    getAllId : "v1/multimedia/getAllId",
    getAllName : "v1/multimedia/getAllName",
    getById : "v1/multimedia/getById",
    getByName : "v1/multimedia/getByName",
    getByFileName : "v1/multimedia/getByFileName",
    getMultimediaIdByFileName : "v1/multimedia/getMultimediaIdByFileName",
    delete : "v1/multimedia/delete",

}



export let multimediaCategoryApi = {
    //multimediaCategory
    add : "v1/multimediacategory/add",
    delete : "v1/multimediacategory/delete",
    getAll : "v1/multimediacategory/getall",
    getById : "v1/multimediacategory/getbyid",
    update : "v1/multimediacategory/update",

}



export let AdministratorApi = {
    //sport
    add : "v1/administrator/add",
    update : "v1/administrator/update",
    delete : "v1/administrator/delete",
    getAll : "v1/administrator/getall",
    getById : "v1/administrator/getbyid",

}

