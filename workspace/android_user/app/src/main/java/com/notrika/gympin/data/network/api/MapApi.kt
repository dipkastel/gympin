package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_map_address
import com.notrika.gympin.data.model.res.Res_map_data
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface MapApi {
    @GET(NetworkConstants.map_get_address)
    fun getAddress(@Query("lat") lat:Double,@Query("lon") lon:Double,@Query("format") format:String="json"): Flowable<Response<Res_map_data>>
}