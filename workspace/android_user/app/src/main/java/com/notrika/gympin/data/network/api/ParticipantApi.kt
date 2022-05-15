package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ParticipantApi {
    @POST(NetworkConstants.EventParticipant_add)
    fun eventParticipantAdd(@Body req: Req_event_walking_add_participant): Flowable<Response<OprationResult<Res_add_participent>>>
    @POST(NetworkConstants.EventParticipant_delete)
    fun eventParticipantDelete(@Body req: Req_event_walking_add_participant): Flowable<Response<OprationResult<Res_add_participent>>>
}