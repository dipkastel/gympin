import {subscribe_addEntryMessage, subscribe_deleteEntryMessage} from "./subscribe.api";
import {Halls_getById} from "./halls.api";
import {placePersonnel_updatePersonnelBuyableAccess} from "./placePersonnel.api";

export let AuthApi = {
    // BASEURL: "http://localhost:8080/api/",
    BASEURL: "http://192.168.0.117:8080/api/",
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
        setUserSettings: "v1/user/setUserSettings",
        getUserSettings: "v1/user/getUserSettings",
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
        PersonnelByUser:"v1/placePersonnel/PersonnelByUser",
        updatePersonnelAccess:"v1/placePersonnel/updatePersonnelAccess",
        getUserPlaceAccess:"v1/placePersonnel/getUserPlaceAccess",
        updatePersonnelBuyableAccess:"v1/placePersonnel/updatePersonnelBuyableAccess",
        getUserPlaceBuyableAccess:"v1/placePersonnel/getUserPlaceBuyableAccess",
        addRole:"v1/placePersonnel/addRole",
        deleteRole:"v1/placePersonnel/deleteRole"
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
    Location:{
        query:"v1/location/query",
    },
    ticketActiveTimes:{
        ADD_ALL:"v1/ticketActiveTimes/addAll",
        GET_BY_HALL:"v1/ticketActiveTimes/getByHall",
        GET_BY_PLACE:"v1/ticketActiveTimes/getByPlace",
        DELETE:"v1/ticketActiveTimes/Delete",
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
        getCoaches: "v1/TicketSubscribe/getCoaches",
        addCoach: "v1/TicketSubscribe/addCoach",
        deleteCoach: "v1/TicketSubscribe/deleteCoach",
        getByPlaceId: "v1/TicketSubscribe/getByPlace",
        countFilter: "v1/TicketSubscribe/count-filter",
        addSubscribeActiveTimes: "v1/TicketSubscribe/addSubscribeActiveTimes",
        getActiveTimesByTicketSubscribe: "v1/TicketSubscribe/getActiveTimesByTicketSubscribe",
        deleteSubscribeActiveTimes: "v1/TicketSubscribe/deleteSubscribeActiveTimes",

    },
    TicketCourse:{
        add: "v1/TicketCourse/add",
        delete: "v1/TicketCourse/delete",
        getAll: "v1/TicketCourse/getAll",
        getTicketCourseDiscountHistory: "v1/TicketCourse/getTicketCourseDiscountHistory",
        getById: "v1/TicketCourse/getById",
        getSports: "v1/TicketCourse/getSports",
        addSport: "v1/TicketCourse/addSport",
        deleteSport: "v1/TicketCourse/deleteSport",
        getCoaches: "v1/TicketCourse/getCoaches",
        addCoach: "v1/TicketCourse/addCoach",
        deleteCoach: "v1/TicketCourse/deleteCoach",
        update: "v1/TicketCourse/update",
        ChangeTicketCourseStatus: "v1/TicketCourse/ChangeTicketCourseStatus",
        query: "v1/TicketCourse/query",
        getByPlaceId: "v1/TicketCourse/getByPlace",
        countFilter: "v1/TicketCourse/count-filter",
        addCourseActiveTimes: "v1/TicketCourse/addCourseActiveTimes",
        getActiveTimesByTicketCourse: "v1/TicketCourse/getActiveTimesByTicketCourse",
        deleteCourseActiveTimes: "v1/TicketCourse/deleteCourseActiveTimes",

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
    Sport:{
        getAll: "v1/sport/getAll",
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
        getPlaceSubscribes:"v1/purchasedSubscribe/getPlaceSubscribes",
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
