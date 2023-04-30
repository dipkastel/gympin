export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
     // BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        REQUEST_REGISTER_PLACE:"v1/account/requestRegisterCorporate",
        REFRESH_TOKEN:"v1/account/refreshToken"
    },
    configs:{
        CorporateSplash:"v1/configs/CorporateSplash"
    },
    corporate:{
        GET_BY_USER:"v1/corporate/getByUser",
        GET_BY_ID:"v1/corporate/getById",
        updateLogo:"v1/corporate/updateLogo",
        getTransactions:"v1/corporate/getTransactions",
        getTotalDeposit:"v1/corporate/getTotalDeposit",
        update:"v1/corporate/update",
    },
    CorporatePersonnel:{
        add: "v1/corporatePersonnel/add",
        addPersonnelCredit: "v1/corporatePersonnel/addPersonnelCredit",
        addCreditToAll: "v1/corporatePersonnel/addCreditToAll",
        getTotalUserCredits: "v1/corporatePersonnel/getTotalUserCredits",
        delete: "v1/corporatePersonnel/delete",
        getAll: "v1/corporatePersonnel/getAll",
        getById: "v1/corporatePersonnel/getById",
        update: "v1/corporatePersonnel/update",
        PersonnelByCorporate:"v1/corporatePersonnel/PersonnelByCorporate"
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
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
    place:{
        GET_ALL:"v1/place/getAll",
        GET_BY_ID:"v1/place/getById",
    },
    placeAbout:{
        GET_BY_PLACE_ID:"v1/placeAbout/getByPlaceId",
    },
    plans:{
        GET_BY_ID:"v1/plan/getById",
        GET_BY_PLACE_ID:"v1/plan/getPlansByPlace"
    },
    region:{
        GET_ALL:"v1/region/getAll",
        GET_BY_CITY:"v1/region/getRegionsByCity"
    },
    sport:{
        GET_ALL:"v1/sport/getAll"
    },
    state:{
        GET_ALL:"v1/state/getAll"
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
    },
    transaction:{
        getPaymentGateways:"v1/transaction/getPaymentGateways",
        setPaymentRequest:"v1/transaction/setPaymentRequest",
        query:"v1/transaction/query",
    }
};
