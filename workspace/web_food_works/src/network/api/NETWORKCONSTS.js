
export let AuthApi = {
  BASEURL: "http://localhost:8080/api/",
  // BASEURL: "http://192.168.1.108:8080/api/",
  // BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
  Account: {
    LOGIN_URL: "v1/account/login",
    SEND_SMS_URL: "v1/account/sendsms",
    REFRESH_TOKEN: "v1/account/refreshToken",
  },
  configs: {
    CateringSplash: "v1/configs/CateringSplash",
  },
  gateway: {
    getPaymentSuggest: "v1/suggest/getall",
    getPaymentGateways: "v1/Gateway/getPaymentGateways",
  },
  gatewayApplication: {
    query: "v1/GatewayApplication/query",
  },
  homePage: {
    GET_HOME_PAGE: "v1/homepage/getHome",
  },
  multimedia: {
    add: "v1/multimedia/add",
    categoryGetById: "v1/multimediacategory/getById",
  },
  Notification: {
    getUserNotifications: "v1/Notification/getUserNotifications",
  },
  optionOfPlace: {
    GET_BY_PLACE_ID: "v1/OptionOfPlace/getByPlaceId",
  },
  place: {
    GET_ALL: "v1/place/getAll",
    GET_BY_ID: "v1/place/getById",
  },
  placeAbout: {
    GET_BY_PLACE_ID: "v1/placeAbout/getByPlaceId",
  },
  plans: {
    GET_BY_ID: "v1/plan/getById",
    GET_BY_PLACE_ID: "v1/plan/getPlansByPlace",
  },
  PlacePersonel:{
    add: "v1/placePersonnel/add",
    delete: "v1/placePersonnel/delete",
    getAll: "v1/placePersonnel/getAll",
    update: "v1/placePersonnel/update",
    addRole: "v1/placePersonnel/addRole",
    getById: "v1/placePersonnel/getById",
    deleteRole: "v1/placePersonnel/deleteRole",
    PersonnelByUser: "v1/placePersonnel/PersonnelByUser",
    PersonnelByPlace: "v1/placePersonnel/PersonnelByPlace",
    GymPersonnelByUser: "v1/placePersonnel/GymPersonnelByUser",
    getUserPlaceAccess: "v1/placePersonnel/getUserPlaceAccess",
    getPlaceBeneficiaries: "v1/placePersonnel/getPlaceBeneficiaries",
    updatePersonnelAccess: "v1/placePersonnel/updatePersonnelAccess",
    CateringPersonnelByUser: "v1/placePersonnel/CateringPersonnelByUser",
    getUserPlaceBuyableAccess: "v1/placePersonnel/getUserPlaceBuyableAccess",
    updatePersonnelCommissionFee: "v1/placePersonnel/updatePersonnelCommissionFee",
    updatePersonnelBuyableAccess: "v1/placePersonnel/updatePersonnelBuyableAccess",
  },
  region: {
    GET_ALL: "v1/region/getAll",
    GET_BY_CITY: "v1/region/getRegionsByCity",
  },
  report: {
    useCateringCharge: "v1/report/useCateringCharge",
  },
  sport: {
    GET_ALL: "v1/sport/getAll",
  },
  state: {
    GET_ALL: "v1/state/getAll",
  },
  suggest: {
    query: "v1/suggest/query",
  },
  support: {
    ADD: "v1/support/add",
    query: "v1/support/query",
    GET_BY_ID: "v1/support/getById",
    ADD_MESSAGE: "v1/support/addMessage",
    GET_BY_PLACE: "v1/support/getByPlace",
    setMessagesRead: "v1/support/setMessagesRead",
    getCateringSupportCount: "v1/support/getCateringSupportCount",
  },
  settlementUserDeposit: {
    add: "v1/settlementUserDeposit/add",
    query: "v1/settlementUserDeposit/query",
  },
  catering: {
    add: "v1/catering/add",
    query: "v1/catering/query",
    delete: "v1/catering/delete",
    update: "v1/catering/update",
    getAll: "v1/catering/getAll",
    getById: "v1/catering/getById",
    updateLogo: "v1/catering/updateLogo",
  },
  ticketFood: {
    add: "v1/TicketFood/add",
    query: "v1/TicketFood/query",
    getAll: "v1/TicketFood/getAll",
    delete: "v1/TicketFood/delete",
    update: "v1/TicketFood/update",
    getById: "v1/TicketFood/getById",
    SetCategory: "v1/TicketFood/SetCategory",
    ClearCategory: "v1/TicketFood/ClearCategory",
    addMultimedia: "v1/TicketFood/addMultimedia",
    getMultimedias: "v1/TicketFood/getMultimedias",
    deleteMultimedia: "v1/TicketFood/deleteMultimedia",
    setDefaultMultimedia: "v1/TicketFood/setDefaultMultimedia",
    GetAllCategoriesByCatering: "v1/TicketFood/GetAllCategoriesByCatering",
  },
  ticketMenu: {
    add: "v1/TicketFoodMenu/add",
    query: "v1/TicketFoodMenu/query",
    getAll: "v1/TicketFoodMenu/getAll",
    delete: "v1/TicketFoodMenu/delete",
    update: "v1/TicketFoodMenu/update",
    getById: "v1/TicketFoodMenu/getById",
    getDates: "v1/TicketFoodMenu/getDates",
    copyDate: "v1/TicketFoodMenu/copyDate",
  },
  user: {
    query: "v1/user/query",
    GET_BY_ID: "v1/user/getById",
    UPDATE_USER: "v1/user/update",
    UPDATE_AVATAR: "v1/user/updateUserAvatar",
    getMyPlaceWallet: "v1/user/getMyPlaceWallet",
  },
  invoice: {
    add: "v1/invoice/add",
    query: "v1/invoice/query",
    update: "v1/invoice/update",
    delete: "v1/invoice/delete",
    getAll: "v1/invoice/getAll",
    getById: "v1/invoice/getById",
    addFood: "v1/invoice/addFood",
    userCheckout: "v1/invoice/userCheckout",
    addSubscribe: "v1/invoice/addSubscribe",
    deleteBuyable: "v1/invoice/deleteBuyable",
    getHowToPay: "v1/invoice/getUserHowToPay",
    getBasketByUserId: "v1/invoice/getBasketByUserId",
    completeFoodPayment: "v1/invoice/completeFoodPayment",
    sendOrderToCorporate: "v1/invoice/sendOrderToCorporate",
    getPreOrderByCatering: "v1/invoice/getPreOrderByCatering",
    changeInvoiceBuyableCount: "v1/invoice/changeInvoiceBuyableCount",
  },
  invoiceExtra: {
    add: "v1/invoiceExtra/add",
    query: "v1/invoiceExtra/query",
    update: "v1/invoiceExtra/update",
    delete: "v1/invoiceExtra/delete",
  },
  transaction: {
    setPaymentRequest: "v1/transaction/setPaymentRequest",
  },
  transactionUser: {
    query: "v1/TransactionUser/query",
  },
  TransactionPersonnelCredit: {
    query: "v1/TransactionPersonnelCredit/query",
  },
};
