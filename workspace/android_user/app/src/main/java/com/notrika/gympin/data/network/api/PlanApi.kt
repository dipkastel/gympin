package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET

interface PlanApi {
    @GET(NetworkConstants.plan_getall)
    fun getPlans(): Flowable<Response<OprationResult<List<Res_plan>>>>
}