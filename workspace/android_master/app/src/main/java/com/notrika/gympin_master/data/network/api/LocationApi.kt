package com.notrika.gympin_master.data.network.api

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Res.Res_UserPlace
import com.notrika.gympin_master.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface LocationApi {

    @GET(NetworkConstants.location_getPlaceByUser)
    fun getPlaceByUser(@Query("Id") userId: Long): Flowable<Response<OprationResult<List<Res_UserPlace>>>>


}