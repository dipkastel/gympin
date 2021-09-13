package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.*

interface UserApi {

    @GET(NetworkConstants.user_login)
    fun userLogin(@Header("Authorization") Auth:String): Flowable<Response<OprationResult<Res_User_Login>>>
    @POST(NetworkConstants.user_sendsms)
    fun userSendSms(@Body reqSendsms: Req_User_SendSms): Flowable<Response<OprationResult<Boolean>>>
    @POST(NetworkConstants.user_register)
    fun userRegister(@Body reqUserRegister: Req_User_Register): Flowable<Response<OprationResult<Res_User_Register>>>


}