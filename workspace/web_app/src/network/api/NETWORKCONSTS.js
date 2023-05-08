export let AuthApi = {
    // BASEURL: "http://localhost:8080/api/",
     BASEURL: "https://api.gympin.ir/",
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
    location:{
        query:"v1/location/query"
    },
    multimedia:{
        add:"v1/multimedia/add",
        categoryGetById:"v1/multimediacategory/getById"
    },
    Notification:{
        getUserNotifications:"v1/Notification/getUserNotifications"
    },
    optionOfPlace:{
        GET_BY_PLACE_ID: "v1/OptionOfPlace/getByPlaceId",
    },
    placeAbout:{
        GET_BY_PLACE_ID:"v1/placeAbout/getByPlaceId",
    },
    PlanGateTimingApi:{
        getByPlan:"v1/plan-gate-timing/getByPlan"
    },
    place:{
        GET_ALL:"v1/place/getAll",
        GET_BY_ID:"v1/place/getById",
        query:"v1/place/query",
    },
    plans:{
        GET_BY_ID:"v1/plan/getById",
        GET_BY_PLACE_ID:"v1/plan/getPlansByPlace"
    },
    sport:{
        GET_ALL:"v1/sport/getAll",
        query:"v1/sport/query"
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
    transaction:{
        getPaymentGateways:"v1/transaction/getPaymentGateways",
        setPaymentRequest:"v1/transaction/setPaymentRequest",
        checkPayment:"v1/transaction/checkPayment",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
        checkUsernameAvailable: "v1/user/checkUsernameAvailable",
    },
    userCredit: {
        getByUser: "v1/userCredit/getByUser",
    }
};
