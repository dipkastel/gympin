package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.*
import com.notrika.gympin.data.model.res.*
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.*

interface EventsApi {
    //walking
    @POST(NetworkConstants.events_walking_add)
    fun eventsWalkingAdd(@Body req: Req_event_walking_add): Flowable<Response<OprationResult<Res_evets_walking>>>
    @PUT(NetworkConstants.events_walking_delete)
    fun eventsWalkingDelete(@Body req: Req_id): Flowable<Response<OprationResult<Res_evets_walking>>>
    @GET(NetworkConstants.events_walking_getall)
    fun eventsWalkingGetAll():Flowable<Response<OprationResult<List<Res_evets_walking>>>>
    @GET(NetworkConstants.events_walking_getbyid)
    fun eventsWalkingGetById():Flowable<Response<OprationResult<Boolean>>>
    @PUT(NetworkConstants.events_walking_update)
    fun eventsWalkingUpdate():Flowable<Response<OprationResult<Boolean>>>
    @GET(NetworkConstants.events_get_All_Event_Of_User)
    fun GetAllEventOfUser(@Query("id") userID: Long): Flowable<Response<OprationResult<Res_my_events>>>
    //biking



}