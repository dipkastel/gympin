package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_Login
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.AccountApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.Credentials
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class UserRequests @Inject
constructor(val accountApi: AccountApi, val pocket: Pocket, val networkSetting: Network_setting) {

    private val TAG: String = this.javaClass.name

    fun RequestSendSms(reqSendsms: Req_User_SendSms): Flowable<Resource<Boolean>> {
        return accountApi.userSendSms(reqSendsms)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
    fun RequestRegister(reqUserRegister: Req_User_Register): Flowable<Resource<Res_User_Register>> {
        return accountApi.userRegister(reqUserRegister)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())
    }
    fun RequestLogin(reqUserLogin: Req_User_Login): Flowable<Resource<Res_User_Login>> {
        return accountApi.userLogin(reqUserLogin)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

