package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface UserApi {
    @GET(NetworkConstants.user_getById)
    fun userGetById(@Query("id") id:Long): Flowable<Response<OprationResult<Res_User>>>

    @GET(NetworkConstants.user_getUserByUsername)
    fun userGetByUsername(@Query("username") id:String): Flowable<Response<OprationResult<Res_User>>>
}