package com.notrika.gympin_master.data.network

object NetworkConstants {
    const val BASE_API_URL = "http://192.168.0.191:8080"
    const val BASE_webView_URL = "http://192.168.0.191:8080"
    const val BASE_MEDIA_URL = "http://192.168.0.191:8080"
    const val GOOGLE_MAP_API_BASE = "https://maps.googleapis.com/maps/api/"
    const val STATIC_CLIENT_ID = "f1f2eb16-1319-4e9c-b7e6-410d589ebf6b"
    const val START_KEY = "api/v1"


    //masterapplication
    const val masterapplication_splash = "$START_KEY/masterapplication/splash"
    //account
    const val account_activate = "$START_KEY/v1/account/activate"
    const val account_CheckToken = "$START_KEY/v1/account/checkToken"
    const val account_GetInviteCode = "$START_KEY/v1/account/GetInviteCode"
    const val account_register = "$START_KEY/v1/account/register"
    const val account_refresh = "$START_KEY/v1/account/refresh"
    const val account_SignUp = "$START_KEY/v1/account/SignUp"
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
