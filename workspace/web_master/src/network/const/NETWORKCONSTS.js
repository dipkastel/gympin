export let AuthApi = {
    BASEURL: "http://api.gympin.ir/"
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        REFRESH_TOKEN:"v1/account/refreshToken"
    },
    mainPage: {
        GET_MAIN_PAGE: "v1/mainpagelayoutcollection/getById",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update"
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
        ADD:"v1/place/add",
        GET_ALL:"v1/place/getAll",
        GET_BY_ID:"v1/place/getById",
        GET_PLACE_BY_USER: "/v1/place/getPlaceByUser",
        GET_OWNERS_PLACE: "/v1/place/getOwnersPlace",
        UPDATE: "/v1/place/UPDATE",
    }
};
