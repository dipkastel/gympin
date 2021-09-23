package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_Login
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.GympinApplicationApi
import com.notrika.gympin.data.network.api.UserApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.Credentials
import okhttp3.ResponseBody
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class UserRequests @Inject
constructor(val userApi: UserApi, val pocket: Pocket, val networkSetting: Network_setting) {

    private val TAG: String = this.javaClass.name

    fun RequestSendSms(reqSendsms: Req_User_SendSms): Flowable<Resource<Boolean>> {
        return userApi.userSendSms(reqSendsms)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
    fun RequestRegister(reqUserRegister: Req_User_Register): Flowable<Resource<Res_User_Register>> {
        return userApi.userRegister(reqUserRegister)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())
    }
    fun RequestLogin(reqUserLogin: Req_User_Login): Flowable<Resource<Res_User_Login>> {
        var Auth = Credentials.basic(reqUserLogin.phoneNumber,reqUserLogin.code)
        return userApi.userLogin(Auth)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}
