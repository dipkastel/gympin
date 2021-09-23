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
    const val account_sendsms = "$START_KEY/account/sendsms"
    const val account_login = "$START_KEY/account/login"
    //location
    const val location_getPlaceByUser = "$START_KEY/location/getPlaceByUser"



}
