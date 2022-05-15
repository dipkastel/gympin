package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.model.res.Res_my_events
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.EventsApi
import com.notrika.gympin.data.network.api.ParticipantApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import org.reactivestreams.Publisher
import retrofit2.Response
import javax.inject.Inject

class ParticipantsRequests @Inject
constructor(val participantApi: ParticipantApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun eventParticipantAdd(req: Req_event_walking_add_participant): Flowable<Resource<Res_add_participent>> {
        return participantApi.eventParticipantAdd(req)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }

    fun eventParticipantRemove(req: Req_event_walking_add_participant): Flowable<Resource<Res_add_participent>> {
        return participantApi.eventParticipantDelete(req)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }


}

