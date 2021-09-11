package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface UserApi {

    @GET(NetworkConstants.user_login)
    fun userLogin(): Flowable<Response<OprationResult<Res_User_Login>>>
    @POST(NetworkConstants.user_sendsms)
    fun userSendSms(@Body reqSendsms: Req_User_SendSms): Flowable<Response<OprationResult<Res_User_SendSms>>>
    @POST(NetworkConstants.user_register)
    fun userRegister(): Flowable<Response<OprationResult<Res_User_Register>>>


}