package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.SportApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class SportRequests @Inject
constructor(val sportApi: SportApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun RequestGetAllSport(): Flowable<Resource<List<Res_sport>>> {
        return sportApi.sportGetAllSport()
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

