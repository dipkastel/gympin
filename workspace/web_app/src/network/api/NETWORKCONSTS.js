import {PlaceAbout_getAllByPlaces} from "./placeAbout.api";
import {User_couchQuery} from "./user.api";

export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
    // BASEURL: "http://192.168.0.117:8080/api/",
    //  BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        REFRESH_TOKEN:"v1/account/refreshToken",
        REGISTER_WITH_INVITE_CODE:"v1/account/registerByInviteCode",
        GET_INVITE_CODES:"v1/account/userInviteCodes"
    },
    configs:{
        WebAppSplash:"v1/configs/WebAppSplash"
    },
    gatewayApplication:{
        query: "v1/GatewayApplication/query",
    },
    suggest: {
        query: "v1/suggest/query",
    },
    qrCode: {
        getCode: "v1/qrCode/getCode",
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
    },
    TicketBuyable:{
        query:"v1/TicketBuyable/query"
    },
    invoice:{
        add:"v1/invoice/add",
        update:"v1/invoice/update",
        delete:"v1/invoice/delete",
        getAll:"v1/invoice/getAll",
        getById:"v1/invoice/getById",
        getBasketByUserId:"v1/invoice/getBasketByUserId",
        query:"v1/invoice/query",
        getHowToPay: "v1/invoice/getUserHowToPay",
        changeInvoiceBuyableCount:"v1/invoice/changeInvoiceBuyableCount",
        userCheckout:"v1/invoice/userCheckout",
        addBuyable:"v1/invoice/addBuyable",
        deleteBuyable:"v1/invoice/deleteBuyable",
    },
    increaseUserDeposit:{
        requestIncreaseUserDeposits:"v1/increaseUserDeposit/requestIncreaseUserDeposits"
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
        getByPlaceId:"v1/placeAbout/getByPlaceId",
        getAllAboutByPlaces:"v1/placeAbout/getAllAboutByPlaces",
    },
    PlanGateTimingApi:{
        getByPlan:"v1/plan-gate-timing/getByPlan"
    },
    place:{
        GET_ALL:"v1/place/getAll",
        GET_BY_ID:"v1/place/getById",
        query:"v1/place/query",
    },
    TicketSubscribe:{
        getById:"v1/TicketSubscribe/getById",
        getByPlace:"v1/TicketSubscribe/getByPlace",
        getActiveTimesByTicketSubscribe:"v1/TicketSubscribe/getActiveTimesByTicketSubscribe"
    },
    TicketCourses:{
        getById:"v1/TicketCourse/getById",
        getByPlace:"v1/TicketCourse/getByPlace",
        getActiveTimesByTicketCourse:"v1/TicketCourse/getActiveTimesByTicketCourse"
    },
    PlacePersonel:{
        PersonnelByPlace: "v1/placePersonnel/PersonnelByPlace",
    },
    sport:{
        GET_ALL:"v1/sport/getAll",
        query:"v1/sport/query"
    },
    purchasedSubscribe:{
        ADD:"v1/purchasedSubscribe/add",
        GET_BY_USER:"v1/purchasedSubscribe/getByUser",
        getById:"v1/purchasedSubscribe/getById",
        getByKey:"v1/purchasedSubscribe/getByKey",
        DELETE:"v1/purchasedSubscribe/delete",
        checkout:"v1/purchasedSubscribe/checkout",
        exitRequest:"v1/purchasedSubscribe/exitRequest",
        enterRequest:"v1/purchasedSubscribe/enterRequest"
    },
    purchasedCourse:{
        ADD:"v1/purchasedCourse/add",
        GET_BY_USER:"v1/purchasedCourse/getByUser",
        getById:"v1/purchasedCourse/getById",
        DELETE:"v1/purchasedCourse/delete",
        checkout:"v1/purchasedCourse/checkout",
        exitRequest:"v1/purchasedCourse/exitRequest",
        enterRequest:"v1/purchasedCourse/enterRequest"
    },
    purchased:{
        query:"v1/purchased/query",
    },
    transaction:{
        getPaymentGateways:"v1/transaction/getPaymentGateways",
        setPaymentRequest:"v1/transaction/setPaymentRequest",
        checkPayment:"v1/transaction/checkPayment",
        query:"v1/transaction/query",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        get_My_Info: "v1/user/getMyInfo",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
        setUserSettings: "v1/user/setUserSettings",
        checkUsernameAvailable: "v1/user/checkUsernameAvailable",
        getMyCredits: "v1/user/getMyCredits",
        query: "v1/user/query",
    }
};
