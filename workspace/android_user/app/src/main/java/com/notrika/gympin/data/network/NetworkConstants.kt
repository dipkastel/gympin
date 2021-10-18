package com.notrika.gympin.data.network

object NetworkConstants {
  //  const val BASE_URL = "http://api.gympin.ir/"
    const val BASE_URL = "http://192.168.0.191:8080/api/"
    const val BASE_API_URL = BASE_URL
    const val BASE_webView_URL = BASE_URL
    const val BASE_MEDIA_URL = BASE_URL
    const val GOOGLE_MAP_API_BASE = "https://maps.googleapis.com/maps/api/"
    const val STATIC_CLIENT_ID = "f1f2eb16-1319-4e9c-b7e6-410d589ebf6b"
    const val START_KEY = "v1"


    //masterapplication
    const val gympinapplication_splash = "$START_KEY/gympinapplication/splash"
    //user-controller-impl
    const val user_sendsms = "$START_KEY/user/sendsms"
    const val user_register = "$START_KEY/user/register"
    const val user_login = "$START_KEY/user/login"


}
