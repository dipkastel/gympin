import {homepage_getAllDestinations} from "./homepage.api";

export let AuthApi = {
  BASEURL: "https://api.gympin.ir/",
  // BASEURL : "http://localhost:8080/api/",
  LOGIN_URL: "v1/account/login",
  SEND_SMS_URL: "v1/account/sendsms",
  register: "v1/account/register",
  REFRESH_TOKEN:"v1/account/refreshToken"

};
export let AdministratorApi = {
  add: "v1/administrator/add",
  update: "v1/administrator/update",
  delete: "v1/administrator/delete",
  getAll: "v1/administrator/getall",
  getById: "v1/administrator/getbyid",
};

export let ArticleApi = {
  add: "v1/article/add",
  delete: "v1/article/delete",
  getAll: "v1/article/getall",
  query: "v1/article/query",
  getById: "v1/article/getById",
  update: "v1/article/update",
  updateArticleImage: "v1/article/updateArticleImage",
};

export let ArticleCategoryApi = {
  add: "v1/articleCategory/add",
  delete: "v1/articleCategory/delete",
  getAll: "v1/articleCategory/getall",
  getById: "v1/articleCategory/getbyid",
  update: "v1/articleCategory/update",
};

export let CorporateApi = {
  add: "v1/corporate/add",
  delete: "v1/corporate/delete",
  getAll: "v1/corporate/getAll",
  getById: "v1/corporate/getById",
  getByUser: "v1/corporate/getByUser",
  getTransactions: "v1/corporate/getTransactions",
  getTotalDeposit: "v1/corporate/getTotalDeposit",
  query: "v1/corporate/query",
  update: "v1/corporate/update",
  updateStatus: "v1/corporate/updateStatus"
};
export let CorporatePersonnelApi = {
  add: "v1/corporatePersonnel/add",
  delete: "v1/corporatePersonnel/delete",
  getAll: "v1/corporatePersonnel/getAll",
  getById: "v1/corporatePersonnel/getById",
  update: "v1/corporatePersonnel/update",
  getTotalUserCredits: "v1/corporatePersonnel/getTotalUserCredits",
  PersonnelByCorporate:"v1/corporatePersonnel/PersonnelByCorporate",
  addPersonnelCredit: "v1/corporatePersonnel/addPersonnelCredit",
};
export let GatesApi = {
  add: "v1/gate/add",
  delete: "v1/gate/delete",
  getAll: "v1/gate/getAll",
  getById: "v1/gate/getById",
  update: "v1/gate/update",
  getByPlaceId: "v1/gate/getGatesByPlace",
  countFilter: "v1/gate/count-filter",
};
export let GateTimingApi = {
  add: "v1/gateTiming/add",
  addAll: "v1/gateTiming/addAll",
  delete: "v1/gateTiming/delete",
  getAll: "v1/gateTiming/getAll",
  getById: "v1/gateTiming/getById",
  update: "v1/gateTiming/update",
  getByGate: "v1/gateTiming/getByGate",
  getByPlace: "v1/gateTiming/getByPlace",
};
export let GateTrafficApi = {
  add: "v1/gateTraffic/add",
  getByGate: "v1/gateTraffic/getByGate"
};
export let homeCollection = {
  add: "v1/mainpagelayoutcollection/add",
  delete: "v1/mainpagelayoutcollection/delete",
  getAll: "v1/mainpagelayoutcollection/getAll",
  getById: "v1/mainpagelayoutcollection/getById",
  getMainPage: "v1/mainpagelayoutcollection/mainPage",
  update: "v1/mainpagelayoutcollection/update",
};
export let homeChild = {
  add: "v1/mainpagelayoutchilditem/add",
  delete: "v1/mainpagelayoutchilditem/delete",
  getAll: "v1/mainpagelayoutchilditem/getAll",
  getById: "v1/mainpagelayoutchilditem/getById",
  getMainPage: "v1/mainpagelayoutchilditem/mainPage",
  update: "v1/mainpagelayoutchilditem/update",
};
export let homeItem = {
  add: "v1/mainpagelayoutitem/add",
  delete: "v1/mainpagelayoutitem/delete",
  getAll: "v1/mainpagelayoutitem/getAll",
  getById: "v1/mainpagelayoutitem/getById",
  getMainPage: "v1/mainpagelayoutitem/mainPage",
  update: "v1/mainpagelayoutitem/update",
};
export let homepage = {
  add: "v1/homepage/add",
  update: "v1/homepage/update",
  delete: "v1/homepage/delete",
  getAll: "v1/homepage/getall",
  query: "v1/homepage/query",
  getById: "v1/homepage/getbyid",
  getHome: "v1/homepage/getHome",
  getAllTypes: "v1/homepage/getAllTypes",
  addType: "v1/homepage/addType",
  deleteType: "v1/homepage/deleteType",
  getAllDestinations: "v1/homepage/getAllDestinations",
  addDestinations: "v1/homepage/addDestinations",
  deleteDestinations: "v1/homepage/deleteDestinations",
};
export let LocationApi = {
  add: "v1/location/add",
  delete: "v1/location/delete",
  getAll: "v1/location/getAll",
  getById: "v1/location/getById",
  update: "v1/location/update",
  query: "v1/location/query"
};
export let MultimediaApi = {
  add: "v1/multimedia/add",
  getAllImages: "v1/multimedia/getAllImages",
  delete: "v1/multimedia/delete",
  query: "v1/multimedia/query"
};
export let multimediaCategoryApi = {
  add: "v1/multimediacategory/add",
  delete: "v1/multimediacategory/delete",
  getAll: "v1/multimediacategory/getall",
  getById: "v1/multimediacategory/getbyid",
  update: "v1/multimediacategory/update",
};
export let NoteApi = {
  add: "v1/note/add",
  delete: "v1/note/delete",
  getAll: "v1/note/getAll",
  getById: "v1/note/getById",
  getByParam: "v1/note/getByParam",
  update: "v1/note/update",
};
export let optionOfPlaceApi = {
  add: "v1/OptionOfPlace/add",
  delete: "v1/OptionOfPlace/delete",
  getAll: "v1/OptionOfPlace/getAll",
  update: "v1/OptionOfPlace/update",
  getByPlaceId: "v1/OptionOfPlace/getByPlaceId",

};
export let PlaceApi = {
  getAllPlace: "v1/place/getAll",
  getPlaceById: "v1/place/getById",
  addPlace: "v1/place/add",
  CHANGE_STATUS:"v1/place/changeStatus",
  deletePlace: "v1/place/delete",
  updatePlace: "v1/place/update",
  countFilter: "v1/place/count-filter",
  getMultimedias:"v1/place/getMultimedias",
  addMultimedia:"v1/place/addMultimedia",
  getByUser:"v1/place/getPlacesByUser",
  query: "v1/place/query",
  deleteMultimedia:"v1/place/deleteMultimedia"
};
export let PlanGateTimingApi = {
  add: "v1/plan-gate-timing/add",
  addAll: "v1/plan-gate-timing/addAll",
  delete: "v1/plan-gate-timing/delete",
  getAll: "v1/plan-gate-timing/getAll",
  getById: "v1/plan-gate-timing/getById",
  update: "v1/plan-gate-timing/update",
  getByPlan: "v1/plan-gate-timing/getByPlan",
};
export let PlansApi = {
  add: "v1/plan/add",
  delete: "v1/plan/delete",
  getAll: "v1/plan/getAll",
  getPlanDiscountHistory: "v1/plan/getPlanDiscountHistory",
  getById: "v1/plan/getById",
  getSports: "v1/plan/getSports",
  addSport: "v1/plan/addSport",
  deleteSport: "v1/plan/deleteSport",
  update: "v1/plan/update",
  PlanStatusChange: "v1/plan/PlanStatusChange",
  query: "v1/plan/query",
  getByPlaceId: "v1/plan/getPlansByPlace",
  countFilter: "v1/plan/count-filter",
};
export let PlaceSportApi = {
  add: "v1/sportPlace/add",
  delete: "v1/sportPlace/delete",
  getAll: "v1/sportPlace/getAll",
  update: "v1/sportPlace/update",
  getSportsByPlace:"v1/sportPlace/getSportsByPlace"
};
export let PlaceOptionApi = {
  add: "v1/PlaceOption/add",
  delete: "v1/PlaceOption/delete",
  getAll: "v1/PlaceOption/getAll",
  update: "v1/PlaceOption/update"
};
export let PlaceAboutApi = {
  add: "v1/placeAbout/add",
  delete: "v1/placeAbout/delete",
  getAll: "v1/placeAbout/getAll",
  update: "v1/placeAbout/update",
  getByPlace:"v1/placeAbout/getByPlaceId"
};
export let PlaceQrMessageApi = {
  add: "v1/PlaceQrMessage/add",
  delete: "v1/PlaceQrMessage/delete",
  getAll: "v1/PlaceQrMessage/getAll",
  update: "v1/PlaceQrMessage/update",
  getByPlace:"v1/PlaceQrMessage/getByPlace"
};
export let PlacePersonelApi = {
  add: "v1/placePersonnel/add",
  delete: "v1/placePersonnel/delete",
  getAll: "v1/placePersonnel/getAll",
  update: "v1/placePersonnel/update",
  PersonnelByPlace:"v1/placePersonnel/PersonnelByPlace",
  getUserPlaceAccess:"v1/placePersonnel/getUserPlaceAccess",
  updatePersonnelAccess:"v1/placePersonnel/updatePersonnelAccess",
  getById:"v1/placePersonnel/getById"
};
export let ReportSettings = {
  getAll:"v1/reportSettings/getAll",
  update:"v1/reportSettings/update",
}
export let SportApi = {
  addSport: "v1/sport/add",
  deleteSport: "v1/sport/delete",
  getAllSport: "v1/sport/getAll",
  getSportById: "v1/sport/getById",
  updateSport: "v1/sport/update",
  query: "v1/sport/query",
  countFilter: "v1/sport/count-filter",
};
export let SettingsApi = {
  add: "v1/Settings/add",
  delete: "v1/Settings/delete",
  getAll: "v1/Settings/getAll",
  update: "v1/Settings/update"
};
export let SupportApi = {
  add: "v1/Support/add",
  addMessage: "v1/Support/addMessage",
  getAll: "v1/Support/getall",
  getById: "v1/Support/getById",
};
export let TicketApi = {
  add: "v1/ticket/add",
  delete: "v1/ticket/delete",
  getAll: "v1/ticket/getall",
  query: "v1/ticket/query",
  getById: "v1/ticket/getById",
  update: "v1/ticket/update"

};
export let TransactionApi = {
  query: "v1/transaction/query",
  placeSetteling: "v1/transaction/placeSetteling",
  handCheckPayment: "v1/transaction/handCheckPayment",
  setPaymentRequest: "v1/transaction/setPaymentRequest",

};
export let UserApi = {
  add: "v1/user/add",
  delete: "v1/user/delete",
  getAll: "v1/user/getall",
  query: "v1/user/query",
  getById: "v1/user/getById",
  update: "v1/user/update",
  countFilter: "v1/user/count-filter",
  getStatuses: "v1/user/getUserStatuses",
  updateUserStatus: "v1/user/updateUserStatus",
  updateUserAvatar: "v1/user/updateUserAvatar",
  getUserRoles: "v1/user/getUserRoles",
  updateUserRole: "v1/user/updateUserRole"

};
export let UserCreditApi = {
  getByUser: "v1/userCredit/getByUser",
};
