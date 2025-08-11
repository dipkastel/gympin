
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
    getPaymentGateways: "v1/Gateway/getPaymentGateways",
    getPaymentSuggest: "v1/suggest/getall",
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
    PersonnelByPlace: "v1/placePersonnel/PersonnelByPlace",
    getUserPlaceAccess: "v1/placePersonnel/getUserPlaceAccess",
    getPlaceBeneficiaries: "v1/placePersonnel/getPlaceBeneficiaries",
    updatePersonnelAccess: "v1/placePersonnel/updatePersonnelAccess",
    getUserPlaceBuyableAccess: "v1/placePersonnel/getUserPlaceBuyableAccess",
    updatePersonnelCommissionFee: "v1/placePersonnel/updatePersonnelCommissionFee",
    updatePersonnelBuyableAccess: "v1/placePersonnel/updatePersonnelBuyableAccess",
    addRole: "v1/placePersonnel/addRole",
    deleteRole: "v1/placePersonnel/deleteRole",
    PersonnelByUser: "v1/placePersonnel/PersonnelByUser",
    GymPersonnelByUser: "v1/placePersonnel/GymPersonnelByUser",
    CateringPersonnelByUser: "v1/placePersonnel/CateringPersonnelByUser",
    getById: "v1/placePersonnel/getById"
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
    ADD_MESSAGE: "v1/support/addMessage",
    GET_BY_PLACE: "v1/support/getByPlace",
    GET_BY_ID: "v1/support/getById",
    setMessagesRead: "v1/support/setMessagesRead",
    getCateringSupportCount: "v1/support/getCateringSupportCount",
    query: "v1/support/query",
  },
  settlementUserDeposit: {
    query: "v1/settlementUserDeposit/query",
    add: "v1/settlementUserDeposit/add",
  },
  catering: {
    updateLogo: "v1/catering/updateLogo",
    getAll: "v1/catering/getAll",
    getById: "v1/catering/getById",
    add: "v1/catering/add",
    delete: "v1/catering/delete",
    update: "v1/catering/update",
    query: "v1/catering/query",
  },
  ticketFood: {
    getAll: "v1/TicketFood/getAll",
    getById: "v1/TicketFood/getById",
    add: "v1/TicketFood/add",
    delete: "v1/TicketFood/delete",
    update: "v1/TicketFood/update",
    query: "v1/TicketFood/query",
  },
  ticketMenu: {
    getAll: "v1/TicketFoodMenu/getAll",
    getById: "v1/TicketFoodMenu/getById",
    add: "v1/TicketFoodMenu/add",
    delete: "v1/TicketFoodMenu/delete",
    update: "v1/TicketFoodMenu/update",
    query: "v1/TicketFoodMenu/query",
    getDates: "v1/TicketFoodMenu/getDates",
    copyDate: "v1/TicketFoodMenu/copyDate",
  },
  user: {
    GET_BY_ID: "v1/user/getById",
    UPDATE_USER: "v1/user/update",
    UPDATE_AVATAR: "v1/user/updateUserAvatar",
    getMyPlaceWallet: "v1/user/getMyPlaceWallet",
    query: "v1/user/query",
  },
  invoice: {
    add: "v1/invoice/add",
    update: "v1/invoice/update",
    delete: "v1/invoice/delete",
    getAll: "v1/invoice/getAll",
    getById: "v1/invoice/getById",
    getBasketByUserId: "v1/invoice/getBasketByUserId",
    getPreOrderByCatering: "v1/invoice/getPreOrderByCatering",
    sendOrderToCorporate: "v1/invoice/sendOrderToCorporate",
    completeFoodPayment: "v1/invoice/completeFoodPayment",
    query: "v1/invoice/query",
    getHowToPay: "v1/invoice/getUserHowToPay",
    changeInvoiceBuyableCount: "v1/invoice/changeInvoiceBuyableCount",
    userCheckout: "v1/invoice/userCheckout",
    addFood: "v1/invoice/addFood",
    addSubscribe: "v1/invoice/addSubscribe",
    deleteBuyable: "v1/invoice/deleteBuyable",
  },
  invoiceExtra: {
    add: "v1/invoiceExtra/add",
    update: "v1/invoiceExtra/update",
    delete: "v1/invoiceExtra/delete",
    query: "v1/invoiceExtra/query",
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
