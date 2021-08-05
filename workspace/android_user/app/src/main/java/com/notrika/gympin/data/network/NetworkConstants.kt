package com.notrika.gympin.data.network

object NetworkConstants {
    const val BASE_API_URL = "https://api.gympin.ir"
    const val BASE_webView_URL = "https://gympin.ir"
    const val BASE_MEDIA_URL = "https://www.gympin.ir"
    const val GOOGLE_MAP_API_BASE = "https://maps.googleapis.com/maps/api/"
    const val STATIC_CLIENT_ID = "f1f2eb16-1319-4e9c-b7e6-410d589ebf6b"
    const val START_KEY = "mobileandroid"


    //account
    const val account_activate = "$START_KEY/v1/account/activate"
    const val account_CheckToken = "$START_KEY/v1/account/checkToken"
    const val account_GetInviteCode = "$START_KEY/v1/account/GetInviteCode"
    const val account_register = "$START_KEY/v1/account/register"
    const val account_refresh = "$START_KEY/v1/account/refresh"
    const val account_SignUp = "$START_KEY/v1/account/SignUp"
    //banner
    const val banner_GetAll = "$START_KEY/v1/banner/GetAll/18"
    //base
    const val base_CustomerPlayerId = "$START_KEY/v1/base/CustomerPlayerId"
    const val base_OnsAddDevice = "$START_KEY/v1/base/OnsAddDevice"
    const val base_ReleaseList = "$START_KEY/v1/base/ReleaseList"
    const val base_SettingNew = "$START_KEY/v1/Base/SettingNew"
    //boxoffice
    const val boxOffice = "$START_KEY/v1/BoxOffice"
    const val RecentYears = "$START_KEY/v1/BoxOffice/RecentYears"
    //category
    const val category_all = "$START_KEY/v1/category/all"
    //cinema
    const val cinema_commentadd = "$START_KEY/v1/cinema/commentadd"
    const val cinema_Comments = "$START_KEY/v1/cinema/Comments"
    const val Cinema_Detail = "$START_KEY/v1/Cinema/Detail"
    const val cinema_vote = "$START_KEY/v1/cinema/vote"
    const val cinema_userVote = "$START_KEY/v1/cinema/userVote"
    const val cinema_all = "$START_KEY/v1/cinema/all"
    //copon
    const val copon_Check = "$START_KEY/v1/copon/Check"
    //copon
    const val developer_ExpireToken = "$START_KEY/v1/Developer/ExpireToken"
    //film
    const val film_GetItem = "$START_KEY/v1/film/GetItem"
    const val film_comment = "$START_KEY/v1/film/comment"
    const val film_onscreen = "$START_KEY/v1/film/onscreen"
    const val film_TicketOff = "$START_KEY/v1/film/TicketOff"
    const val film_rateadd = "$START_KEY/v1/film/rateadd"
    const val film_commentadd = "$START_KEY/v1/film/commentadd"
    const val film_commentlike = "$START_KEY/v1/film/LikeComment"
    const val film_CommentaddReplay = "$START_KEY/v1/film/CommentAddReplay"
    const val film_sanses = "$START_KEY/v1/film/sanses"
    const val film_cinemas = "$START_KEY/v1/film/cinemas"
    //news
    const val news_getpage = "$START_KEY/v1/news/getpage"
    //order
    const val order_selectbanktype = "$START_KEY/v1/order/selectbanktype"
    const val order_CheckOutAlreadyPurchased = "$START_KEY/v1/order/CheckOutAlreadyPurchased"
    const val order_check = "$START_KEY/v1/order/check"
    const val order_Credit = "$START_KEY/v1/order/Credit/"
    const val order_Calculate = "$START_KEY/v1/order/Calculate"
    const val order_Revoke = "$START_KEY/v1/Order/Revoke"
    const val order_new = "mobile/v1/order/new"
    //product
    const val product_ListByCinemaCode = "$START_KEY/v1/Product/ListByCinemaCode"
    //sans
    const val sanse_ticketoff = "$START_KEY/v1/sanse/ticketoff"
    const val sanse_select = "$START_KEY/v1/sanse/select"
    const val sanse_plan = "$START_KEY/v1/sanse/plan"
    const val sanse_reserve_seat = "$START_KEY/v1/sanse/reserve-seat"

    //search
    const val search_getbykey = "$START_KEY/v1/Search/GetListByKey"

    //user
    const val user_Copons = "$START_KEY/v1/user/Copons"
    const val user_filmseen = "$START_KEY/v1/user/filmseen"
    const val user_GetChangePassword = "$START_KEY/v1/user/GetChangePassword"
    const val user_messages = "$START_KEY/v1/user/messages"
    const val user_MarketGetGift = "$START_KEY/v1/user/MarketGetGift"
    const val user_MarketBuyGift = "$START_KEY/v1/user/MarketBuyGift"
    const val user_OrderTransactions = "$START_KEY/v1/User/OrderTransactions"
    const val user_profile = "$START_KEY/v1/user/profile"
    const val user_Transactions = "$START_KEY/v1/user/Transactions"
    const val user_UserInfoByPhone = "$START_KEY/v1/user/UserInfoByPhone"









}
