package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.POST

interface GympinApplicationApi {

    @POST(NetworkConstants.gympinapplication_splash)
    fun baseSettingNow(): Flowable<Response<OprationResult<Res_Application_Splash>>>


}