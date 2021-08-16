package com.notrika.gympin_master.data.network.api

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Res_BaseSetting
import com.notrika.gympin_master.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.POST

interface BaseApi {

    @POST(NetworkConstants.base_SettingNew)
    fun baseSettingNow(): Flowable<Response<OprationResult<Res_BaseSetting>>>


}