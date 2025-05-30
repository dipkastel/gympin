import {increaseCorporateDeposit_requestIncreaseCorporateDeposits} from "./increaseCorporateDeposit.api";

export let AuthApi = {
    BASEURL: "http://localhost:8080/api/",
     // BASEURL: "https://api.gympin.ir/",
};
export let Api_url = {
    Account: {
        LOGIN_URL: "v1/account/login",
        SEND_SMS_URL: "v1/account/sendsms",
        requestRegisterCorporate:"v1/account/requestRegisterCorporate",
        REFRESH_TOKEN:"v1/account/refreshToken"
    },
    configs:{
        CorporateSplash:"v1/configs/CorporateSplash"
    },
    corporate:{
        GET_BY_ID:"v1/corporate/getById",
        updateLogo:"v1/corporate/updateLogo",
        getTransactions:"v1/corporate/getTransactions",
        getTotalDeposit:"v1/corporate/getTotalDeposit",
        update:"v1/corporate/update",
        getCorproteCategories:"v1/corporate/getCorporateGroups",
        addCategory:"v1/corporate/addGroup",
        sendContractCode:"v1/corporate/sendContractCode",
        signContract:"v1/corporate/signContract",
        updateContract:"v1/corporate/updateContract",
        getTotalIncreases:"v1/corporate/getTotalIncreases",
        deleteCategory:"v1/corporate/deleteGroup",
        updateStatus:"v1/corporate/updateStatus"
    },
    CorporatePersonnel:{
        add: "v1/corporatePersonnel/add",
        corporateOwnedByUserId: "v1/corporatePersonnel/corporateOwnedByUserId",
        addPersonnelCredit: "v1/corporatePersonnel/addPersonnelCredit",
        manualExpireCredit: "v1/corporatePersonnel/manualExpireCredit",
        addCreditToAll: "v1/corporatePersonnel/addCreditToAll",
        getTotalUserCredits: "v1/corporatePersonnel/getTotalUserCredits",
        delete: "v1/corporatePersonnel/delete",
        getAll: "v1/corporatePersonnel/getAll",
        getById: "v1/corporatePersonnel/getById",
        update: "v1/corporatePersonnel/update",
        query: "v1/corporatePersonnel/query",
        PersonnelByCorporate:"v1/corporatePersonnel/PersonnelByCorporate"
    },
    gateway:{
        getPaymentGateways:"v1/Gateway/getPaymentGateways",
        getPaymentSuggest:"v1/suggest/getall",
    },
    gatewayApplication:{
        query: "v1/GatewayApplication/query",
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
    report:{
        useCorporateCharge:"v1/report/useCorporateCharge"
    },
    sport:{
        GET_ALL:"v1/sport/getAll"
    },
    state:{
        GET_ALL:"v1/state/getAll"
    },
    suggest: {
        query: "v1/suggest/query",
    },
    support:{
        ADD:"v1/support/add",
        ADD_MESSAGE:"v1/support/addMessage",
        GET_BY_PLACE:"v1/support/getByPlace",
        GET_BY_ID:"v1/support/getById",
        setMessagesRead:"v1/support/setMessagesRead",
        getCorporateSupportCount:"v1/support/getCorporateSupportCount",
        query: "v1/support/query"
    },
    catering:{
        getAll: "v1/catering/getAll",
        getById: "v1/catering/getById",
        add: "v1/catering/add",
        delete: "v1/catering/delete",
        update: "v1/catering/update",
        query: "v1/catering/query",
    },
    ticketFood:{

        getAll: "v1/TicketFood/getAll",
        getById: "v1/TicketFood/getById",
        add: "v1/TicketFood/add",
        delete: "v1/TicketFood/delete",
        update: "v1/TicketFood/update",
        query: "v1/TicketFood/query",
    },
    ticketMenu:{
        getAll: "v1/TicketFoodMenu/getAll",
        getById: "v1/TicketFoodMenu/getById",
        add: "v1/TicketFoodMenu/add",
        delete: "v1/TicketFoodMenu/delete",
        update: "v1/TicketFoodMenu/update",
        query: "v1/TicketFoodMenu/query",
        getDates: "v1/TicketFoodMenu/getDates",
    },
    user: {
        GET_BY_ID: "v1/user/getById",
        UPDATE_USER: "v1/user/update",
        UPDATE_AVATAR: "v1/user/updateUserAvatar",
        query:"v1/user/query",
    },
    increaseCorporateDeposit:{
        requestIncreaseCorporateDeposits:"v1/increaseCorporateDeposit/requestIncreaseCorporateDeposits",
        requestIncreaseCorporateDepositsDraft:"v1/increaseCorporateDeposit/requestIncreaseCorporateDepositsDraft",
        completeRequestIncreaseCorporateDeposits:"v1/increaseCorporateDeposit/completeRequestIncreaseCorporateDeposits",
        getProFormaInvoice:"v1/increaseCorporateDeposit/getProFormaInvoice",
        delete:"v1/increaseCorporateDeposit/delete"
    },
    transaction:{
        setPaymentRequest:"v1/transaction/setPaymentRequest",
        query:"v1/TransactionCorporate/query",
        increaseQuery: "v1/increaseCorporateDeposit/query",
    },
    TransactionPersonnelCredit:{
        query:"v1/TransactionPersonnelCredit/query",
    }
};
