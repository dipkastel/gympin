package com.notrika.gympin_master.data.network.request

import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.model.Res.Res_UserPlace
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.HttpCode
import com.notrika.gympin_master.data.network.ResultManager
import com.notrika.gympin_master.data.network.api.LocationApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class LocationRequests @Inject
constructor(val locationApi: LocationApi, val pocket: Pocket, val networkSetting: Network_setting) {

    private val TAG: String = this.javaClass.name

    fun RequestGetPlaceByUser(): Flowable<Resource<List<Res_UserPlace>>> {
        return locationApi.getPlaceByUser(pocket.userId)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

