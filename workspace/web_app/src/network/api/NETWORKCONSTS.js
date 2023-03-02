export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
     // BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        REFRESH_TOKEN:"v1/account/refreshToken"
    },
    configs:{
        WebAppSplash:"v1/configs/WebAppSplash"
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
    },
    userCredit: {
        getByUser: "v1/userCredit/getByUser",
    },
    multimedia:{
        add:"v1/multimedia/add"
    },
    Notification:{
        getUserNotifications:"v1/Notification/getUserNotifications"
    },
    sport:{
        GET_ALL:"v1/sport/getAll"
    },
    state:{
        GET_ALL:"v1/state/getAll"
    },
    region:{
        GET_ALL:"v1/region/getAll",
        GET_BY_CITY:"v1/region/getRegionsByCity"
    },
    place:{
        GET_ALL:"v1/place/getAll",
        GET_BY_ID:"v1/place/getById",
    },
    plans:{
        GET_BY_ID:"v1/plan/getById",
        GET_BY_PLACE_ID:"v1/plan/getPlansByPlace"
    },
    optionOfPlace:{
        GET_BY_PLACE_ID: "v1/OptionOfPlace/getByPlaceId",
    },
    placeAbout:{
        GET_BY_PLACE_ID:"v1/placeAbout/getByPlaceId",
    },
    ticket:{
        ADD:"v1/ticket/add",
        GET_BY_USER:"v1/ticket/getByUser",
        getById:"v1/ticket/getById",
        DELETE:"v1/ticket/delete",
        checkout:"v1/ticket/checkout",
        exitRequest:"v1/ticket/exitRequest",
        enterRequest:"v1/ticket/enterRequest"
    },
    PlanGateTimingApi:{
        getByPlan:"v1/plan-gate-timing/getByPlan"
    },
    transaction:{
        getPaymentGateways:"v1/transaction/getPaymentGateways",
        setPaymentRequest:"v1/transaction/setPaymentRequest",
        checkPayment:"v1/transaction/checkPayment",
    }
};
