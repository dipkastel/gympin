import {purchasedSubscribe_getPlaceSellsSubscribesCount} from "./subscribe.api";

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
        REQUEST_REGISTER_PLACE: "v1/account/requestRegisterPlace"
    },
    TicketBuyable: {
        query: "v1/TicketBuyable/query"
    },
    configs: {
        WebMasterSplash: "v1/configs/MasterSplash"
    },
    homePage: {
        GET_HOME_PAGE: "v1/homepage/getHome",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        GET_BY_USER_NAME: "v1/user/getUserByUsername",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
        setUserSettings: "v1/user/setUserSettings",
        getUserSettings: "v1/user/getUserSettings",
        getMyPlaceWallet: "v1/user/getMyPlaceWallet",
    },
    multimedia: {
        add: "v1/multimedia/add",
        categoryGetById: "v1/multimediacategory/getById"
    },
    Notification: {
        getUserNotifications: "v1/Notification/getUserNotifications"
    },
    gym: {
        UPDATE: "/v1/gym/UPDATE",
        CHANGE_STATUS: "v1/gym/changeStatus",
        signContract: "/v1/gym/signContract",
        ADD_MULTIMEDIA: "/v1/gym/addMultimedia",
        updateContract: "/v1/gym/updateContract",
        GET_MULTIMEDIAS: "/v1/gym/GetMultimedias",
        GET_PLACES_BY_USER: "v1/gym/getPlacesByUser",
        sendContractCode: "/v1/gym/sendContractCode",
        DELETE_MULTIMEDIA: "/v1/gym/deleteMultimedia",
        getMyPlaceGymById: "v1/gym/getMyPlaceGymById",
    },
    placeOption: {
        GET_ALL: "v1/placeOption/getAll"
    },
    placePersonnel: {
        add: "v1/placePersonnel/add",
        delete: "v1/placePersonnel/delete",
        getAll: "v1/placePersonnel/getAll",
        update: "v1/placePersonnel/update",
        PersonnelByPlace: "v1/placePersonnel/PersonnelByPlace",
        PersonnelByUser: "v1/placePersonnel/PersonnelByUser",
        updatePersonnelAccess: "v1/placePersonnel/updatePersonnelAccess",
        getUserPlaceAccess: "v1/placePersonnel/getUserPlaceAccess",
        updatePersonnelBuyableAccess: "v1/placePersonnel/updatePersonnelBuyableAccess",
        getUserPlaceBuyableAccess: "v1/placePersonnel/getUserPlaceBuyableAccess",
        addRole: "v1/placePersonnel/addRole",
        deleteRole: "v1/placePersonnel/deleteRole"
    },
    optionOfPlace: {
        ADD: "v1/OptionOfPlace/add",
        DELETE: "v1/OptionOfPlace/delete",
        GET_BY_PLACE_ID: "v1/OptionOfPlace/getByPlaceId",
    },
    placeQR: {
        ADD: "v1/placeQrMessage/add",
        DELETE: "v1/placeQrMessage/delete",
        GET_BY_PLACE_ID: "v1/placeQrMessage/getByPlace",
    },
    placeAbout: {
        ADD: "v1/placeAbout/add",
        DELETE: "v1/placeAbout/delete",
        GET_BY_PLACE_ID: "v1/placeAbout/getByPlaceId",
        UPDATE: "/v1/placeAbout/update",
    },
    Halls: {
        ADD: "v1/hall/add",
        DELETE: "v1/hall/delete",
        GET_BY_ID: "v1/hall/getById",
        GET_BY_PLACE_ID: "v1/hall/getHallsByPlace",
        UPDATE: "/v1/hall/update",
    },
    HallTraffic: {
        ADD: "v1/hallTraffic/add",
        GET_BY_HALL: "v1/hallTraffic/getByHall",
    },
    Location: {
        query: "v1/location/query",
    },
    ticketActiveTimes: {
        ADD_ALL: "v1/ticketActiveTimes/addAll",
        GET_BY_HALL: "v1/ticketActiveTimes/getByHall",
        GET_BY_PLACE: "v1/ticketActiveTimes/getByPlace",
        DELETE: "v1/ticketActiveTimes/Delete",
    },
    TicketSubscribe: {
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
    TicketCourse: {
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
    support: {
        ADD: "v1/support/add",
        ADD_MESSAGE: "v1/support/addMessage",
        GET_BY_PLACE: "v1/support/getByPlace",
        query: "v1/support/query",
        GET_BY_ID: "v1/support/getById",
        setMessagesRead: "v1/support/setMessagesRead",
    },
    settlementUserDeposit: {
        query: "v1/settlementUserDeposit/query",
        add: "v1/settlementUserDeposit/add",
    },
    PlaceSport: {
        add: "v1/placeSport/add",
        delete: "v1/placeSport/delete",
        getAll: "v1/placeSport/getAll",
        update: "v1/placeSport/update",
        getSportsByPlace: "v1/placeSport/getSportsByPlace"
    },
    Sport: {
        getAll: "v1/sport/getAll",
    },
    Purchased: {
        add: "v1/Purchased/add",
        delete: "v1/Purchased/delete",
        getAll: "v1/Purchased/getAll",
        update: "v1/Purchased/update",
        query: "v1/Purchased/query",
    },
    purchasedSubscribe: {
        enter: "v1/purchasedSubscribe/enter",
        query: "v1/purchasedSubscribe/query",
        getById: "v1/purchasedSubscribe/getById",
        getByKey: "v1/purchasedSubscribe/getByKey",
        exitRequest: "v1/purchasedSubscribe/exitRequest",
        enterRequest: "v1/purchasedSubscribe/enterRequest",
        getUserEntered: "v1/purchasedSubscribe/getUserEntered",
        exitUserOfPlace: "v1/purchasedSubscribe/exitUserOfPlace",
        addEntryMessage: "v1/purchasedSubscribe/addEntryMessage",
        scannedSubscribe: "v1/purchasedSubscribe/scannedSubscribe",
        getEnterRequested: "v1/purchasedSubscribe/getEnterRequested",
        increaseExpireDate: "v1/purchasedSubscribe/increaseExpireDate",
        deleteEntryMessage: "v1/purchasedSubscribe/deleteEntryMessage",
        getPlaceSubscribes: "v1/purchasedSubscribe/getPlaceSubscribes",
        addEnterToSubscribe: "v1/purchasedSubscribe/addEnterToSubscribe",
        getActiveSubscribes: "v1/purchasedSubscribe/getActiveSubscribes",
        acceptEnterRequested: "v1/purchasedSubscribe/acceptEnterRequested",
        getUserSubscribesByPlace: "v1/purchasedSubscribe/getUserSubscribesByPlace",
        getPlaceSellsSubscribesCount: "v1/purchasedSubscribe/getPlaceSellsSubscribesCount",
    },
    qrCode: {
        getCode: "v1/qrCode/getCode",
    },
    transactionUser: {
        query: "v1/TransactionUser/query",
    },
    place: {
        update: "v1/place/update",
        addCategory: "v1/place/addGroup",
        updateLogo: "v1/place/updateLogo",
        signContract: "v1/place/signContract",
        updateStatus: "v1/place/updateStatus",
        deleteCategory: "v1/place/deleteGroup",
        getMyPlaceById: "v1/place/getMyPlaceById",
        updateContract: "v1/place/updateContract",
        getTransactions: "v1/place/getTransactions",
        getTotalDeposit: "v1/place/getTotalDeposit",
        sendContractCode: "v1/place/sendContractCode",
        getTotalIncreases: "v1/place/getTotalIncreases",
        getCorproteCategories: "v1/place/getCorporateGroups",
    },
    CorporatePersonnel: {
        setAllPersonelAccessToCatering:
            "v1/corporatePersonnel/setAllPersonelAccessToCatering",
        setPersonelAccessToCatering:
            "v1/corporatePersonnel/setPersonelAccessToCatering",
        corporateOwnedByUserId: "v1/corporatePersonnel/corporateOwnedByUserId",
        PersonnelByCorporate: "v1/corporatePersonnel/PersonnelByCorporate",
        getTotalUserCredits: "v1/corporatePersonnel/getTotalUserCredits",
        addPersonnelCredit: "v1/corporatePersonnel/addPersonnelCredit",
        manualExpireCredit: "v1/corporatePersonnel/manualExpireCredit",
        addCreditToAll: "v1/corporatePersonnel/addCreditToAll",
        getById: "v1/corporatePersonnel/getById",
        delete: "v1/corporatePersonnel/delete",
        getAll: "v1/corporatePersonnel/getAll",
        update: "v1/corporatePersonnel/update",
        query: "v1/corporatePersonnel/query",
        add: "v1/corporatePersonnel/add",
    },
    gateway: {
        getPaymentGateways: "v1/Gateway/getPaymentGateways",
        getPaymentSuggest: "v1/suggest/getall",
    },
    gatewayApplication: {
        query: "v1/GatewayApplication/query",
    },
    transactionCorporate: {
        query: "v1/transactionCorporate/query",
    },
    NotificationSubscription: {
        add: "v1/NotificationSubscription/add",
    },
    personnelFood: {
        add: "v1/personnelFood/add",
        query: "v1/personnelFood/query",
        delete: "v1/personnelFood/delete",
    },
    plans: {
        GET_BY_ID: "v1/plan/getById",
        GET_BY_PLACE_ID: "v1/plan/getPlansByPlace",
    },
    region: {
        GET_ALL: "v1/region/getAll",
        GET_BY_CITY: "v1/region/getRegionsByCity",
    },
    report: {
        getAiReport: "v1/report/getAiReport",
        getPlaceViews: "v1/report/getPlaceViews",
        getPopularSports: "v1/report/getPopularSports",
        useCorporateCharge: "v1/report/useCorporateCharge",
        getActivePersonnel: "v1/report/getActivePersonnel",
        getGenderCompetition: "v1/report/getGenderCompetition",
        ticketBuyCountThisWeek: "v1/report/ticketBuyCountThisWeek",
        getBalanceChangedReport: "v1/report/getBalanceChangedReport",
        getActiveInEnterPlacePersonnel: "v1/report/getActiveInEnterPlacePersonnel",
    },
    sport: {
        GET_ALL: "v1/sport/getAll",
    },
    service: {
        GET_ACTIVE_USERS_BY_CORPORATE: "v1/service/getActiveUsersByCorporate",
    },
    state: {
        GET_ALL: "v1/state/getAll",
    },
    suggest: {
        query: "v1/suggest/query",
    },
    serial: {
        query: "v1/serial/query",
    },
    catering: {
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
    },
    invoice: {
        add: "v1/invoice/add",
        query: "v1/invoice/query",
        update: "v1/invoice/update",
        delete: "v1/invoice/delete",
        getAll: "v1/invoice/getAll",
        addFood: "v1/invoice/addFood",
        getById: "v1/invoice/getById",
        cancelOrder: "v1/invoice/cancelOrder",
        userCheckout: "v1/invoice/userCheckout",
        addSubscribe: "v1/invoice/addSubscribe",
        deleteBuyable: "v1/invoice/deleteBuyable",
        getHowToPay: "v1/invoice/getUserHowToPay",
        getFoodBasket: "v1/invoice/getFoodBasket",
        getBasketByUserId: "v1/invoice/getBasketByUserId",
        confirmFoodPayment: "v1/invoice/confirmFoodPayment",
        sendOrderToCatering: "v1/invoice/sendOrderToCatering",
        changeInvoiceBuyableCount: "v1/invoice/changeInvoiceBuyableCount",
    },
    increaseCorporateDeposit: {
        requestIncreaseCorporateDeposits:
            "v1/increaseCorporateDeposit/requestIncreaseCorporateDeposits",
        requestIncreaseCorporateDepositsDraft:
            "v1/increaseCorporateDeposit/requestIncreaseCorporateDepositsDraft",
        completeRequestIncreaseCorporateDeposits:
            "v1/increaseCorporateDeposit/completeRequestIncreaseCorporateDeposits",
        getProFormaInvoice: "v1/increaseCorporateDeposit/getProFormaInvoice",
        getInvoice: "v1/increaseCorporateDeposit/getInvoice",
        delete: "v1/increaseCorporateDeposit/delete",
    },
    transaction: {
        setPaymentRequest: "v1/transaction/setPaymentRequest",
        query: "v1/TransactionCorporate/query",
        increaseQuery: "v1/increaseCorporateDeposit/query",
    },
    ws: {
        query: "v1/ws/query",
    },
    TransactionPersonnelCredit: {
        query: "v1/TransactionPersonnelCredit/query",
    },
    Chat: {
        endpoint: "GympinChatEndPoint",
    },
};
