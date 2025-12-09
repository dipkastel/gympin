

export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
    // BASEURL: "http://192.168.1.108:8080/api/",
    // BASEURL: "https://api.gympin.ir/",
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
    catering: {
        getAll: "v1/catering/getAll",
        getById: "v1/catering/getById",
    },
    ticketFood: {

        getAll: "v1/TicketFood/getAll",
        getById: "v1/TicketFood/getById",
        query: "v1/TicketFood/query",
    },
    ticketMenu: {
        getAll: "v1/TicketFoodMenu/getAll",
        getById: "v1/TicketFoodMenu/getById",
        query: "v1/TicketFoodMenu/query",
        getDates: "v1/TicketFoodMenu/getDates",
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
    giftCredit:{
        checkStatus:"v1/giftCredit/checkStatus"
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
    },
    TicketBuyable:{
        query:"v1/TicketBuyable/query"
    },
    gift:{
        claim:"v1/giftCredit/claimGift"
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
        SmartisCheckOut:"v1/invoice/SmartisCheckOut",
        userCheckout:"v1/invoice/userCheckout",
        addSubscribe:"v1/invoice/addSubscribe",
        deleteBuyable:"v1/invoice/deleteBuyable",
    },
    placeRate:{
        add:"v1/placeRate/add",
    },
    placeComment:{
        add:"v1/placeComment/add",
        query:"v1/placeComment/query"
    },
    personnelFood:{
        add:"v1/personnelFood/add",
        query:"v1/personnelFood/query",
        delete:"v1/personnelFood/delete"
    },
    increaseUserDeposit:{
        requestIncreaseUserDeposits:"v1/increaseUserDeposit/requestIncreaseUserDeposits",
        query: "v1/increaseUserDeposit/query",
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
    NotificationSubscription: {
        add: "v1/NotificationSubscription/add"
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
    gym:{
        GET_ALL:"v1/gym/getAll",
        GET_BY_ID:"v1/gym/getById",
        query:"v1/gym/query",
    },
    TicketSubscribe:{
        getById:"v1/TicketSubscribe/getById",
        getByPlace:"v1/TicketSubscribe/getByPlace",
        getActiveTimesByTicketSubscribe:"v1/TicketSubscribe/getActiveTimesByTicketSubscribe"
    },
    Link:{
        getByCode: "v1/link/getByCode",
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
    support: {
        ADD: "v1/support/add",
        ADD_MESSAGE: "v1/support/addMessage",
        GET_BY_PLACE: "v1/support/getByPlace",
        GET_BY_ID: "v1/support/getById",
        setMessagesRead: "v1/support/setMessagesRead",
        getCorporateSupportCount: "v1/support/getCorporateSupportCount",
        query: "v1/support/query"
    },
    purchasedSubscribe:{
        ADD:"v1/purchasedSubscribe/add",
        query:"v1/purchasedSubscribe/query",
        DELETE:"v1/purchasedSubscribe/delete",
        getById:"v1/purchasedSubscribe/getById",
        checkout:"v1/purchasedSubscribe/checkout",
        getByKey:"v1/purchasedSubscribe/getByKey",
        GET_BY_USER:"v1/purchasedSubscribe/getByUser",
        exitRequest:"v1/purchasedSubscribe/exitRequest",
        enterRequest:"v1/purchasedSubscribe/enterRequest",
        addEnterToSubscribe: "v1/purchasedSubscribe/addEnterToSubscribe",
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
    },
    ws: {
        query: "v1/ws/query",
    },
    Chat:{
        endpoint:"GympinChatEndPoint"
    }
};
