package com.notrika.gympin_master.data.network.api

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Res_Splash
import com.notrika.gympin_master.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import java.util.*

interface AccountApi {

    @POST(NetworkConstants.user_sendsms)
    fun sendSms(@Body phoneNumber: String): Flowable<Response<OprationResult<Boolean>>>


}