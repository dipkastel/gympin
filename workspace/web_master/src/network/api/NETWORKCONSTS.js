import {subscribe_addEntryMessage, subscribe_deleteEntryMessage} from "./subscribe.api";
import {Halls_getById} from "./halls.api";

export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
    // BASEURL: "http://192.168.0.117:8080/api/",
    // BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        REFRESH_TOKEN:"v1/account/refreshToken",
        REQUEST_REGISTER_PLACE:"v1/account/requestRegisterPlace"
    },
    configs:{
        WebMasterSplash:"v1/configs/MasterSplash"
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
    },
    multimedia:{
        add:"v1/multimedia/add",
        categoryGetById:"v1/multimediacategory/getById"
    },
    Notification:{
        getUserNotifications:"v1/Notification/getUserNotifications"
    },
    place:{
        GET_PLACES_BY_USER:"v1/place/getPlacesByUser",
        GET_BY_ID:"v1/place/getById",
        CHANGE_STATUS:"v1/place/changeStatus",
        UPDATE: "/v1/place/UPDATE",
        GET_MULTIMEDIAS: "/v1/place/GetMultimedias",
        ADD_MULTIMEDIA: "/v1/place/addMultimedia",
        DELETE_MULTIMEDIA: "/v1/place/deleteMultimedia",
    },
    placeOption:{
        GET_ALL:"v1/placeOption/getAll"
    },
    placePersonnel:{
        add: "v1/placePersonnel/add",
        delete: "v1/placePersonnel/delete",
        getAll: "v1/placePersonnel/getAll",
        update: "v1/placePersonnel/update",
        PersonnelByPlace:"v1/placePersonnel/PersonnelByPlace",
        updatePersonnelAccess:"v1/placePersonnel/updatePersonnelAccess",
        getUserPlaceAccess:"v1/placePersonnel/getUserPlaceAccess",
        updatePersonnelHallAccess:"v1/placePersonnel/updatePersonnelHallAccess",
        getUserPlaceHallAccess:"v1/placePersonnel/getUserPlaceHallAccess"
    },
    optionOfPlace:{
        ADD: "v1/OptionOfPlace/add",
        DELETE: "v1/OptionOfPlace/delete",
        GET_BY_PLACE_ID: "v1/OptionOfPlace/getByPlaceId",
    },
    placeQR:{
        ADD:"v1/placeQrMessage/add",
        DELETE:"v1/placeQrMessage/delete",
        GET_BY_PLACE_ID:"v1/placeQrMessage/getByPlace",
    },
    placeAbout:{
        ADD:"v1/placeAbout/add",
        DELETE:"v1/placeAbout/delete",
        GET_BY_PLACE_ID:"v1/placeAbout/getByPlaceId",
        UPDATE: "/v1/placeAbout/update",
    },
    Halls:{
        ADD:"v1/hall/add",
        DELETE:"v1/hall/delete",
        GET_BY_ID:"v1/hall/getById",
        GET_BY_PLACE_ID:"v1/hall/getHallsByPlace",
        UPDATE: "/v1/hall/update",
    },
    HallTraffic:{
        ADD:"v1/hallTraffic/add",
        GET_BY_HALL:"v1/hallTraffic/getByHall",
    },
    ticketSubscribeActiveTimes:{
        ADD_ALL:"v1/ticketSubscribeActiveTimes/addAll",
        GET_BY_HALL:"v1/ticketSubscribeActiveTimes/getByHall",
        GET_BY_PLACE:"v1/ticketSubscribeActiveTimes/getByPlace",
        DELETE:"v1/ticketSubscribeActiveTimes/Delete",
    },
    TicketSubscribe:{
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
        addSubscribeActiveTimes: "v1/TicketSubscribe/addSubscribeActiveTimes",
        getActiveTimesByTicketSubscribe: "v1/TicketSubscribe/getActiveTimesByTicketSubscribe",
        deleteSubscribeActiveTimes: "v1/TicketSubscribe/deleteSubscribeActiveTimes",

    },
    support:{
        ADD:"v1/support/add",
        ADD_MESSAGE:"v1/support/addMessage",
        GET_BY_PLACE:"v1/support/getByPlace",
        GET_BY_ID:"v1/support/getById",
    },
    settlementUserDeposit:{
        query: "v1/settlementUserDeposit/query",
        add: "v1/settlementUserDeposit/add",
    },
    PlaceSport:{
        add: "v1/placeSport/add",
        delete: "v1/placeSport/delete",
        getAll: "v1/placeSport/getAll",
        update: "v1/placeSport/update",
        getSportsByPlace: "v1/placeSport/getSportsByPlace"
    },
    Purchased:{
        add: "v1/Purchased/add",
        delete: "v1/Purchased/delete",
        getAll: "v1/Purchased/getAll",
        update: "v1/Purchased/update",
        query: "v1/Purchased/query",
    },
    purchasedSubscribe:{
        enter:"v1/purchasedSubscribe/enter",
        getById:"v1/purchasedSubscribe/getById",
        exitRequest:"v1/purchasedSubscribe/exitRequest",
        enterRequest:"v1/purchasedSubscribe/enterRequest",
        exitUserOfPlace:"v1/purchasedSubscribe/exitUserOfPlace",
        getEnterRequested:"v1/purchasedSubscribe/getEnterRequested",
        increaseExpireDate:"v1/purchasedSubscribe/increaseExpireDate",
        addEnterToSubscribe:"v1/purchasedSubscribe/addEnterToSubscribe",
        acceptEnterRequested:"v1/purchasedSubscribe/acceptEnterRequested",
        getUserEntered:"v1/purchasedSubscribe/getUserEntered",
        getActiveSubscribes:"v1/purchasedSubscribe/getActiveSubscribes",
        getUserSubscribesByPlace:"v1/purchasedSubscribe/getUserSubscribesByPlace",
        addEntryMessage:"v1/purchasedSubscribe/addEntryMessage",
        deleteEntryMessage:"v1/purchasedSubscribe/deleteEntryMessage",
        scannedSubscribe:"v1/purchasedSubscribe/scannedSubscribe"
    },
    qrCode: {
        getCode: "v1/qrCode/getCode",
    },
    transactionUser:{
        query: "v1/TransactionUser/query",
    }
};
