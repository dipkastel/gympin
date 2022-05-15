package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_map_data
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.MapApi
import com.notrika.gympin.data.network.api.SportApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import retrofit2.http.Query
import javax.inject.Inject

class MapRequests @Inject
constructor(val MapApi: MapApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun RequestGetAddress(lat:Double, lon:Double): Flowable<Resource<Res_map_data>> {
        return MapApi.getAddress(lat,lon)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    Resource.success(it.body())
                }
                .subscribeOn(Schedulers.io())

    }



}

