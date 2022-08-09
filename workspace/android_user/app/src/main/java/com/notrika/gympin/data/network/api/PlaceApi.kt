package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_place
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface PlaceApi {

    @GET(NetworkConstants.place_getByPlan)
    fun getPlacesByPlan(@Query("id") lat:Long): Flowable<Response<OprationResult<List<Res_place>>>>

    @GET(NetworkConstants.place_getall)
    fun getPlacesGetAll(): Flowable<Response<OprationResult<List<Res_place>>>>
}