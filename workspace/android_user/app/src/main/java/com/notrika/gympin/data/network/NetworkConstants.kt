package com.notrika.gympin.data.network

object NetworkConstants {
    const val BASE_URL = "http://api.gympin.ir/"
    const val OPEN_STREET_MAP_API_BASE = "https://nominatim.openstreetmap.org/"
    const val GOOGLE_MAP_API_BASE = "https://maps.googleapis.com/maps/api/"
    const val BASE_API_URL = "http://api.gympin.ir/"
    const val BASE_webView_URL = "http://api.gympin.ir/"
    const val BASE_MEDIA_URL = "http://api.gympin.ir/"
    const val STATIC_CLIENT_ID = "f1f2eb16-1319-4e9c-b7e6-410d589ebf6b"
    const val START_KEY = "v1"


    //gympinapplication
    const val gympinapplication_splash = "$START_KEY/gympinapplication/splash"
    //account
    const val account_sendsms = "$START_KEY/account/sendsms"
    const val account_register = "$START_KEY/account/register"
    const val account_login = "$START_KEY/account/login"
    const val account_refreshToken = "$START_KEY/account/refreshToken"
    //user
    const val user_getById = "$START_KEY/user/getById"
    const val user_getUserByUsername = "$START_KEY/user/getUserByUsername"
    const val user_update = "$START_KEY/user/update"
    //sport
    const val sport_getall = "$START_KEY/sport/getall"
    //main page layout collection
    const val main_gethomeData = "$START_KEY/mainpagelayoutcollection/mainpage"
    //multimedia
    const val multimedia_add = "$START_KEY/multimedia/add"

    //events
    //  walking
    const val events_walking_add = "$START_KEY/WalkingEvent/add"
    const val events_walking_delete = "$START_KEY/WalkingEvent/delete"
    const val events_walking_getall = "$START_KEY/WalkingEvent/getall"
    const val events_walking_getbyid = "$START_KEY/WalkingEvent/getbyid"
    const val events_walking_update = "$START_KEY/WalkingEvent/update"
    const val events_get_All_Event_Of_User = "$START_KEY/WalkingEvent/getAllEventOfUser"
    //participant
    const val eventParticipant_add = "$START_KEY/EventParticipant/add"
    const val eventParticipant_delete = "$START_KEY/EventParticipant/delete"
    //follow
    const val follow_add = "$START_KEY/follow/add"
    const val follow_followers = "$START_KEY/follow/followers"
    const val follow_followings = "$START_KEY/follow/following"
    //rate
    const val rate_add = "$START_KEY/user-rate/add"

   //map address
    const val map_get_address = "reverse"

    //plans
    const val plan_getall = "$START_KEY/plan/getAll"

    //place
    const val place_getByPlan = "$START_KEY/place/getByPlan"
    const val place_getall = "$START_KEY/place/getAll"



}
