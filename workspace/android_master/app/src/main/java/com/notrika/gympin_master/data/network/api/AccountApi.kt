package com.notrika.gympin_master.data.network.api

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Req_SendSms
import com.notrika.gympin_master.data.model.Res_Login
import com.notrika.gympin_master.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface AccountApi {

    @POST(NetworkConstants.user_sendsms)
    fun sendSms(@Body phoneNumber: Req_SendSms): Flowable<Response<OprationResult<Boolean>>>

    @GET(NetworkConstants.user_login)
    fun login(@Header("Authorization") authorization: String): Flowable<Response<OprationResult<Res_Login>>>


}