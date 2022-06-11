package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.*

interface MultimediaApi {
    @Multipart
    @POST(NetworkConstants.multimedia_add)
    fun multimediaAdd(@Part filePart: MultipartBody.Part): Flowable<Response<OprationResult<Int>>>
}
