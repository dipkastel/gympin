package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.req.Req_id
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.model.res.Res_my_events
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.EventsApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import org.reactivestreams.Publisher
import retrofit2.Response
import javax.inject.Inject

class EventsRequests @Inject
constructor(val eventsApi: EventsApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun requestGetWalkingEvents(): Flowable<Resource<List<Res_evets_walking>>> {
        return eventsApi.eventsWalkingGetAll()
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
    fun requestAddWalkingEvents(req_event_walking: Req_event_walking_add): Flowable<Resource<Res_evets_walking>> {
        return eventsApi.eventsWalkingAdd(req_event_walking)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
    fun requestDeleteWalkingEvents(req: Req_id): Flowable<Resource<Res_evets_walking>> {
        return eventsApi.eventsWalkingDelete(req)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }

    fun requestGetAllEventOfUser(userID: Long): Publisher<Resource<Res_my_events>> {
        return eventsApi.GetAllEventOfUser(userID)
            .onErrorReturn {
                Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
            }
            .map {

                ResultManager.OnOprationResult(it)
            }
            .subscribeOn(Schedulers.io())
    }


}

