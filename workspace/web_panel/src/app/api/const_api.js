export let AuthApi = {
  BASEURL: "http://api.gympin.ir/",
  // BASEURL : "http://localhost:8080/api/",
  LOGIN_URL: "v1/account/loginpPanel",
  SEND_SMS_URL: "v1/account/sendsms",
};
export let LocationApi = {
  //state
  addState: "v1/state/add",
  getAllState: "v1/state/getall",
  updateState: "v1/state/update",
  deleteState: "v1/state/delete",
  //city
  addCity: "v1/city/add",
  deleteCity: "v1/city/delete",
  getAllCity: "v1/city/getall",
  getCitiesByState: "v1/city/getCitiesByState",
  updateCity: "v1/city/update",
  //region
  getRegionsByCity: "v1/region/getRegionsByCity",
  addRegion: "v1/region/add",
  deleteRegion: "v1/region/delete",
  updateRegion: "v1/region/update",
  //place
  getAllPlace: "v1/place/getAll",
  getPlaceById: "v1/place/getById",
  addPlace: "v1/place/add",
  deletePlace: "v1/place/delete",
  updatePlace: "v1/place/update",
  //place client
  addPlaceOwner: "v1/place/addPlaceOwner",
  getOwnersPlace: "v1/place/getOwnersPlace",
};

export let SportApi = {
  //sport
  addSport: "v1/sport/add",
  deleteSport: "v1/sport/delete",
  getAllSport: "v1/sport/getAll",
  getSportById: "v1/sport/getById",
  updateSport: "v1/sport/update",
};

export let collection = {
  //sport
  add: "v1/mainpagelayoutcollection/add",
  delete: "v1/mainpagelayoutcollection/delete",
  getAll: "v1/mainpagelayoutcollection/getAll",
  getById: "v1/mainpagelayoutcollection/getById",
  getMainPage: "v1/mainpagelayoutcollection/mainPage",
  update: "v1/mainpagelayoutcollection/update",
};

export let UserApi = {
  //sport
  add: "v1/user/add",
  delete: "v1/user/delete",
  getAll: "v1/user/getall",
  getById: "v1/user/getById",
  update: "v1/user/update",
};

export let MultimediaApi = {
  //multimedia
  add: "v1/multimedia/add",
  addImage: "v1/multimedia/addImage",
  addAudio: "v1/multimedia/addAudio",
  addVideo: "v1/multimedia/addVideo",
  getAllByType: "v1/multimedia/getAllByType",
  getAllId: "v1/multimedia/getAllId",
  getAllName: "v1/multimedia/getAllName",
  getAll: "v1/multimedia/getAll",
  getById: "v1/multimedia/getById",
  getByName: "v1/multimedia/getByName",
  getByFileName: "v1/multimedia/getByFileName",
  getMultimediaIdByFileName: "v1/multimedia/getMultimediaIdByFileName",
  delete: "v1/multimedia/delete",
};

export let multimediaCategoryApi = {
  //multimediaCategory
  add: "v1/multimediacategory/add",
  delete: "v1/multimediacategory/delete",
  getAll: "v1/multimediacategory/getall",
  getById: "v1/multimediacategory/getbyid",
  update: "v1/multimediacategory/update",
};

export let AdministratorApi = {
  //sport
  add: "v1/administrator/add",
  update: "v1/administrator/update",
  delete: "v1/administrator/delete",
  getAll: "v1/administrator/getall",
  getById: "v1/administrator/getbyid",
};
