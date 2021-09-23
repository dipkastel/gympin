package com.notrika.gympin_master.data.network.request

import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.model.Req.Req_Login
import com.notrika.gympin_master.data.model.Req.Req_SendSms
import com.notrika.gympin_master.data.model.Res.Res_Login
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.HttpCode
import com.notrika.gympin_master.data.network.ResultManager
import com.notrika.gympin_master.data.network.api.AccountApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class AccountRequests @Inject
constructor(val accountApi: AccountApi, val pocket: Pocket, val networkSetting: Network_setting) {

    private val TAG: String = this.javaClass.name

    fun RequestSendSms(phoneNumber: Req_SendSms): Flowable<Resource<Boolean>> {
        return accountApi.sendSms(phoneNumber)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }

    fun RequestLogin(req_login: Req_Login): Flowable<Resource<Res_Login>> {
        return accountApi.login(req_login.getAuth())
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

