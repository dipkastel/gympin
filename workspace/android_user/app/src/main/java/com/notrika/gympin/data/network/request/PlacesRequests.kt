package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_Add_Follow
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_place
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.FollowApi
import com.notrika.gympin.data.network.api.PlaceApi
import com.notrika.gympin.data.network.api.PlanApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class PlacesRequests @Inject
constructor(val placeApi: PlaceApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun RequestGetAllPlaces(): Flowable<Resource<List<Res_place>>> {
        return placeApi.getPlacesGetAll()
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }

    fun RequestGetPlacesbyPlanId(planId:Long): Flowable<Resource<List<Res_place>>> {
        return placeApi.getPlacesByPlan(planId)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

