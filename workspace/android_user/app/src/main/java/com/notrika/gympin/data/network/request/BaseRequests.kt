package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.GympinApplicationApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class BaseRequests @Inject
constructor(val gympinApplicationApi: GympinApplicationApi, val pocket: Pocket, val networkSetting: Network_setting) {

    private val TAG: String = this.javaClass.name

    fun RequestSplash(): Flowable<Resource<Res_Application_Splash>> {
        return gympinApplicationApi.baseSettingNow()
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

