import {user_addUserRole} from "./user.api";
import {sms_updatePattern} from "./sms.api";

export let AuthApi = {
    // BASEURL: "https://api.gympin.ir/",
    BASEURL : "http://localhost:8080/api/",
    // BASEURL: "http://192.168.0.117:8080/api/",
    LOGIN_URL: "v1/account/login",
    SEND_SMS_URL: "v1/account/sendsms",
    register: "v1/account/register",
    registerByInviteCode: "v1/account/registerByInviteCode",
    REFRESH_TOKEN: "v1/account/refreshToken"

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
    updateStatus: "v1/corporate/updateStatus",
    updateContractType: "v1/corporate/updateContractType",
    updateDefaultExpireDuration: "v1/corporate/updateDefaultExpireDuration",
    updateContractDate: "v1/corporate/updateContractDate",
    updateStepPayment: "v1/corporate/updateStepPayment",
    getFinanceCorporate: "v1/corporate/getFinanceCorporate",
    getCorporateGroups: "v1/corporate/getCorporateGroups",
    addGroup: "v1/corporate/addGroup",
    deleteGroup: "v1/corporate/deleteGroup",
};
export let CorporatePersonnelApi = {
    add: "v1/corporatePersonnel/add",
    delete: "v1/corporatePersonnel/delete",
    getAll: "v1/corporatePersonnel/getAll",
    getById: "v1/corporatePersonnel/getById",
    addList: "v1/corporatePersonnel/addList",
    query: "v1/corporatePersonnel/query",
    addCreditToAll: "v1/corporatePersonnel/addCreditToAll",
    getByUser: "v1/corporatePersonnel/corporateByUserId",
    update: "v1/corporatePersonnel/update",
    getTotalUserCredits: "v1/corporatePersonnel/getTotalUserCredits",
    PersonnelByCorporate: "v1/corporatePersonnel/PersonnelByCorporate",
    addPersonnelCredit: "v1/corporatePersonnel/addPersonnelCredit",
    decreaseCredit: "v1/corporatePersonnel/decreaseCredit",
    manualExpireCredit: "v1/corporatePersonnel/manualExpireCredit",
};
export let HallsApi = {
    add: "v1/hall/add",
    delete: "v1/hall/delete",
    getAll: "v1/hall/getAll",
    getById: "v1/hall/getById",
    update: "v1/hall/update",
    getByPlaceId: "v1/hall/getHallsByPlace",
};

export let ticketActiveTimesApi = {
    add: "v1/ticketActiveTimes/add",
    addAll: "v1/ticketActiveTimes/addAll",
    delete: "v1/ticketActiveTimes/delete",
    getAll: "v1/ticketActiveTimes/getAll",
    getById: "v1/ticketActiveTimes/getById",
    update: "v1/ticketActiveTimes/update",
    getByHall: "v1/ticketActiveTimes/getByHall",
    getByPlace: "v1/ticketActiveTimes/getByPlace",
};

export let HallTrafficApi = {
    add: "v1/hallTraffic/add",
    getByHall: "v1/hallTraffic/getByHall"
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
export let TicketBuyableApi = {
    query: "v1/TicketBuyable/query",
    getWanderers: "v1/TicketBuyable/getWanderers",
    setTicketBeneficiary: "v1/TicketBuyable/setTicketBeneficiary",
    getById: "v1/TicketBuyable/getById"
};
export let MultimediaApi = {
    add: "v1/multimedia/add",
    getAllImages: "v1/multimedia/getAllImages",
    getAllFiles: "v1/multimedia/getAllFiles",
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
    query: "v1/note/query",
};
export let optionOfPlaceApi = {
    add: "v1/OptionOfPlace/add",
    delete: "v1/OptionOfPlace/delete",
    getAll: "v1/OptionOfPlace/getAll",
    update: "v1/OptionOfPlace/update",
    getByPlaceId: "v1/OptionOfPlace/getByPlaceId",

};
export let ServiceApi = {
    query: "v1/service/query",
    deleteCorruptedItems: "v1/service/deleteCorruptedItems",
    getUsersActive: "v1/service/getUsersActive",
};
export let PlaceApi = {
    getAllPlace: "v1/place/getAll",
    getPlaceById: "v1/place/getById",
    getPlacesInviteCode: "v1/place/getPlacesInviteCode",
    addPlace: "v1/place/add",
    CHANGE_STATUS: "v1/place/changeStatus",
    deletePlace: "v1/place/delete",
    updatePlace: "v1/place/update",
    updateOrder: "v1/place/updateOrder",
    countFilter: "v1/place/count-filter",
    getMultimedias: "v1/place/getMultimedias",
    addMultimedia: "v1/place/addMultimedia",
    getBuyableByPlace: "v1/place/getBuyableByPlace",
    addMultimediaList: "v1/place/addMultimediaList",
    getByUser: "v1/place/getPlacesByUser",
    query: "v1/place/query",
    deleteMultimedia: "v1/place/deleteMultimedia"
};
export let TicketSubscribesApi = {
    add: "v1/TicketSubscribe/add",
    delete: "v1/TicketSubscribe/delete",
    getAll: "v1/TicketSubscribe/getAll",
    getTicketSubscribeDiscountHistory: "v1/TicketSubscribe/getTicketSubscribeDiscountHistory",
    getById: "v1/TicketSubscribe/getById",
    getSports: "v1/TicketSubscribe/getSports",
    addSport: "v1/TicketSubscribe/addSport",
    deleteSport: "v1/TicketSubscribe/deleteSport",
    update: "v1/TicketSubscribe/update",
    ChangeTicketSubscribeStatus: "v1/TicketSubscribe/ChangeTicketSubscribeStatus",
    query: "v1/TicketSubscribe/query",
    getByPlaceId: "v1/TicketSubscribe/getByPlace",
    countFilter: "v1/TicketSubscribe/count-filter",
    getCoaches: "v1/TicketSubscribe/getCoaches",
    addCoach: "v1/TicketSubscribe/addCoach",
    deleteCoach: "v1/TicketSubscribe/deleteCoach",
    addSubscribeActiveTimes: "v1/TicketSubscribe/addSubscribeActiveTimes",
    getActiveTimesByTicketSubscribe: "v1/TicketSubscribe/getActiveTimesByTicketSubscribe",
    deleteSubscribeActiveTimes: "v1/TicketSubscribe/deleteSubscribeActiveTimes",
};
export let TicketCoursesApi = {
    add: "v1/TicketCourse/add",
    delete: "v1/TicketCourse/delete",
    getAll: "v1/TicketCourse/getAll",
    getById: "v1/TicketCourse/getById",
    getSports: "v1/TicketCourse/getSports",
    addSport: "v1/TicketCourse/addSport",
    deleteSport: "v1/TicketCourse/deleteSport",
    getCoaches: "v1/TicketCourse/getCoaches",
    addCoach: "v1/TicketCourse/addCoach",
    deleteCoach: "v1/TicketCourse/deleteCoach",
    update: "v1/TicketCourse/update",
    changeTicketCourseStatus: "v1/TicketCourse/changeTicketCourseStatus",
    query: "v1/TicketCourse/query",
    getByPlaceId: "v1/TicketCourse/getByPlace",
    countFilter: "v1/TicketCourse/count-filter",
    addCourseActiveTimes: "v1/TicketCourse/addCourseActiveTimes",
    getActiveTimesByTicketCourse: "v1/TicketCourse/getActiveTimesByTicketCourse",
    deleteCourseActiveTimes: "v1/TicketCourse/deleteCourseActiveTimes",
};

export let PurchasedApi = {
    add: "v1/Purchased/add",
    delete: "v1/Purchased/delete",
    getAll: "v1/Purchased/getAll",
    getById: "v1/Purchased/getById",
    update: "v1/Purchased/update",
    query: "v1/Purchased/query",

};
export let PlaceSportApi = {
    add: "v1/placeSport/add",
    delete: "v1/placeSport/delete",
    getAll: "v1/placeSport/getAll",
    update: "v1/placeSport/update",
    getSportsByPlace: "v1/placeSport/getSportsByPlace"
};
export let PlaceOptionApi = {
    add: "v1/PlaceOption/add",
    delete: "v1/PlaceOption/delete",
    getAll: "v1/PlaceOption/getAll",
    query: "v1/PlaceOption/query",
    update: "v1/PlaceOption/update"
};
export let InvoiceApi = {
    add: "v1/invoice/add",
    delete: "v1/invoice/delete",
    getAll: "v1/invoice/getAll",
    query: "v1/invoice/query",
    checkout: "v1/invoice/checkout",
    advancedCheckout: "v1/invoice/advancedCheckout",
    changeStatus: "v1/invoice/changeStatus",
    update: "v1/invoice/update",
    addBuyable: "v1/invoice/addBuyable",
    changeInvoiceBuyableCount: "v1/invoice/changeInvoiceBuyableCount",
    deleteBuyable: "v1/invoice/deleteBuyable",
    getById: "v1/invoice/getById"
};
export let PlaceAboutApi = {
    add: "v1/placeAbout/add",
    delete: "v1/placeAbout/delete",
    getAll: "v1/placeAbout/getAll",
    update: "v1/placeAbout/update",
    getByPlace: "v1/placeAbout/getByPlaceId"
};
export let PlaceQrMessageApi = {
    add: "v1/PlaceQrMessage/add",
    delete: "v1/PlaceQrMessage/delete",
    getAll: "v1/PlaceQrMessage/getAll",
    update: "v1/PlaceQrMessage/update",
    getByPlace: "v1/PlaceQrMessage/getByPlace"
};
export let PlacePersonelApi = {
    add: "v1/placePersonnel/add",
    delete: "v1/placePersonnel/delete",
    getAll: "v1/placePersonnel/getAll",
    update: "v1/placePersonnel/update",
    PersonnelByPlace: "v1/placePersonnel/PersonnelByPlace",
    getUserPlaceAccess: "v1/placePersonnel/getUserPlaceAccess",
    getPlaceBeneficiaries: "v1/placePersonnel/getPlaceBeneficiaries",
    updatePersonnelAccess: "v1/placePersonnel/updatePersonnelAccess",
    getUserPlaceBuyableAccess: "v1/placePersonnel/getUserPlaceBuyableAccess",
    updatePersonnelCommissionFee: "v1/placePersonnel/updatePersonnelCommissionFee",
    updatePersonnelBuyableAccess: "v1/placePersonnel/updatePersonnelBuyableAccess",
    addRole: "v1/placePersonnel/addRole",
    deleteRole: "v1/placePersonnel/deleteRole",
    getById: "v1/placePersonnel/getById"
};
export let ReportSettings = {
    getAll: "v1/reportSettings/getAll",
    update: "v1/reportSettings/update",
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
export let SmsApi = {
    add: "v1/sms/add",
    delete: "v1/sms/delete",
    getAll: "v1/sms/getAll",
    getById: "v1/sms/getById",
    getAllPatterns: "v1/sms/getAllPatterns",
    updatePattern: "v1/sms/updatePattern",
    addPattern: "v1/sms/addPattern",
    update: "v1/sms/update",
    changeSmsStatus: "v1/sms/changeSmsStatus",
    query: "v1/sms/query",
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
    query: "v1/Support/query",
};
export let purchasedSubscribeApi = {
    add: "v1/purchasedSubscribe/add",
    query: "v1/purchasedSubscribe/query",
    update: "v1/purchasedSubscribe/update",
    delete: "v1/purchasedSubscribe/delete",
    getAll: "v1/purchasedSubscribe/getall",
    getById: "v1/purchasedSubscribe/getById",
    updateStatus: "v1/purchasedSubscribe/updateStatus",
    enterRequest: "v1/purchasedSubscribe/enterRequest",
    exitUserOfPlace: "v1/purchasedSubscribe/exitUserOfPlace",
    increaseExpireDate: "v1/purchasedSubscribe/increaseExpireDate",
    addEnterToSubscribe: "v1/purchasedSubscribe/addEnterToSubscribe",
    acceptEnterRequested: "v1/purchasedSubscribe/acceptEnterRequested",

};
export let purchasedCourseApi = {
    add: "v1/purchasedCourse/add",
    query: "v1/purchasedCourse/query",
    update: "v1/purchasedCourse/update",
    delete: "v1/purchasedCourse/delete",
    getAll: "v1/purchasedCourse/getall",
    getById: "v1/purchasedCourse/getById",
    updateStatus: "v1/purchasedCourse/updateStatus",
    enterRequest: "v1/purchasedCourse/enterRequest",
    exitUserOfPlace: "v1/purchasedCourse/exitUserOfPlace",
    addEnterToCourse: "v1/purchasedCourse/addEnterToCourse",
    acceptEnterRequested: "v1/purchasedCourse/acceptEnterRequested",

};
export let IncreaseUserDepositApi = {
    add: "v1/increaseUserDeposit/add",
    delete: "v1/increaseUserDeposit/delete",
    getAll: "v1/increaseUserDeposit/getall",
    query: "v1/increaseUserDeposit/query",
    getById: "v1/increaseUserDeposit/getById",
    confirmIncreaseRequest: "v1/increaseUserDeposit/confirmIncreaseRequest",
    update: "v1/increaseUserDeposit/update"

};
export let SettlementUserDepositApi = {
    add: "v1/settlementUserDeposit/add",
    delete: "v1/settlementUserDeposit/delete",
    getAll: "v1/settlementUserDeposit/getall",
    query: "v1/settlementUserDeposit/query",
    getById: "v1/settlementUserDeposit/getById",
    confirmSettlementRequest: "v1/settlementUserDeposit/confirmSettlementRequest",
    update: "v1/settlementUserDeposit/update"

};
export let IncreaseCorporateDepositApi = {
    add: "v1/increaseCorporateDeposit/add",
    delete: "v1/increaseCorporateDeposit/delete",
    getAll: "v1/increaseCorporateDeposit/getall",
    query: "v1/increaseCorporateDeposit/query",
    getById: "v1/increaseCorporateDeposit/getById",
    confirmIncreaseRequest: "v1/increaseCorporateDeposit/confirmIncreaseRequest",
    update: "v1/increaseCorporateDeposit/update"

};

export let SerialApi = {
    query: "v1/serial/query",
    getBySerial: "v1/serial/getBySerial",
    getById: "v1/serial/getById",
};

export let SuggestApi = {
    add: "v1/suggest/add",
    delete: "v1/suggest/delete",
    getAll: "v1/suggest/getAll",
    getById: "v1/suggest/getById",
    update: "v1/suggest/update",
    query: "v1/suggest/query",
};

export let GatewayApi = {
    add: "v1/Gateway/add",
    delete: "v1/Gateway/delete",
    getAll: "v1/Gateway/getAll",
    getById: "v1/Gateway/getById",
    update: "v1/Gateway/update",
    query: "v1/Gateway/query",
    updateImage: "v1/Gateway/updateImage",
};
export let GatewayApplicationApi = {
    add: "v1/GatewayApplication/add",
    delete: "v1/GatewayApplication/delete",
    getAll: "v1/GatewayApplication/getAll",
    getById: "v1/GatewayApplication/getById",
    update: "v1/GatewayApplication/update",
    query: "v1/GatewayApplication/query",
};

export let TransactionAllApi = {
    query: "v1/TransactionAll/query"
};

export let TransactionUserApi = {
    query: "v1/TransactionUser/query",
    placeSetteling: "v1/TransactionUser/placeSetteling",
    handCheckPayment: "v1/TransactionUser/handCheckPayment",
    setPaymentRequest: "v1/TransactionUser/setPaymentRequest",
};

export let TransactionCorporateApi = {
    query: "v1/TransactionCorporate/query",
    placeSetteling: "v1/TransactionCorporate/placeSetteling",
    handCheckPayment: "v1/TransactionCorporate/handCheckPayment",
    setPaymentRequest: "v1/TransactionCorporate/setPaymentRequest",
};


export let TransactionPersonnelCredit = {
    query: "v1/TransactionPersonnelCredit/query",
};

export let TransactionIncomeApi = {
    query: "v1/TransactionIncome/query",
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
    getUserSettings: "v1/user/getUserSettings",
    setUserSettings: "v1/user/setUserSettings",
    getUserCredits: "v1/user/getUserCredits",
    updateUserStatus: "v1/user/updateUserStatus",
    updateUserAvatar: "v1/user/updateUserAvatar",
    getFinanceUser: "v1/user/getFinanceUser",

};
export let userRolesApi = {
    getAllRoles: "v1/userRoles/getAllRoles",
    add: "v1/userRoles/add",
    delete: "v1/userRoles/delete",
    query: "v1/userRoles/query"

};
export let UserCreditApi = {};
