package com.notrika.gympin_master.data.network.api

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Res_Splash
import com.notrika.gympin_master.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.POST
import java.util.*

interface BaseApi {

    @POST(NetworkConstants.masterapplication_splash)
    fun baseSettingNow(): Flowable<Response<OprationResult<Res_Splash>>>


}