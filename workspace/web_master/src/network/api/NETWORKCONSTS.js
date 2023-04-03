import {ticket_addEntryMessage, ticket_deleteEntryMessage} from "./ticket.api";

export let AuthApi = {
    // BASEURL: "http://localhost:8080/api/",
    BASEURL: "https://api.gympin.ir/",
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
        add:"v1/multimedia/add"
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
        getUserPlaceAccess:"v1/placePersonnel/getUserPlaceAccess"
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
    Gates:{
        ADD:"v1/gate/add",
        DELETE:"v1/gate/delete",
        GET_BY_ID:"v1/gate/getById",
        GET_BY_PLACE_ID:"v1/gate/getGatesByPlace",
        UPDATE: "/v1/gate/update",
    },
    GateTraffic:{
        ADD:"v1/gateTraffic/add",
        GET_BY_GATE:"v1/gateTraffic/getByGate",
    },
    GateTiming:{
        ADD_ALL:"v1/gateTiming/addAll",
        GET_BY_GATE:"v1/gateTiming/getByGate",
        GET_BY_PLACE:"v1/gateTiming/getByPlace",
        DELETE:"v1/gateTiming/Delete",
    },
    PlanGatesTiming:{
        ADD_ALL:"v1/plan-gate-timing/addAll",
        DELETE:"v1/plan-gate-timing/delete",
        GET_BY_PLAN:"v1/plan-gate-timing/getByPlan",
    },
    placePlans:{
        ADD:"v1/plan/add",
        DELETE:"v1/plan/delete",
        GET_BY_ID:"v1/plan/getById",
        GET_BY_PLACE_ID:"v1/plan/getPlansByPlace",
        UPDATE: "/v1/plan/update",
    },
    support:{
        ADD:"v1/support/add",
        ADD_MESSAGE:"v1/support/addMessage",
        GET_BY_PLACE:"v1/support/getByPlace",
        GET_BY_ID:"v1/support/getById",
    },
    ticket:{
        enter:"v1/ticket/enter",
        getById:"v1/ticket/getById",
        exitRequest:"v1/ticket/exitRequest",
        enterRequest:"v1/ticket/enterRequest",
        getEnterRequested:"v1/ticket/getEnterRequested",
        increaseExpireDate:"v1/ticket/increaseExpireDate",
        acceptEnterRequested:"v1/ticket/acceptEnterRequested",
        getUserEntered:"v1/ticket/getUserEntered",
        getActiveTickets:"v1/ticket/getActiveTickets",
        getUserTicketsByPlace:"v1/ticket/getUserTicketsByPlace",
        addEntryMessage:"v1/ticket/addEntryMessage",
        deleteEntryMessage:"v1/ticket/deleteEntryMessage",
        scannedTicket:"v1/ticket/scannedTicket"
    },
    transaction:{
        getByPlaceId:"v1/transaction/getByPlaceId",
        settlementRequest:"v1/transaction/settlementRequest",
        query:"v1/transaction/query"
    }
};
