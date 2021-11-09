package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.POST

interface SportApi {
    @GET(NetworkConstants.sport_getAllSport)
    fun sportGetAllSport(): Flowable<Response<OprationResult<List<Res_sport>>>>
}