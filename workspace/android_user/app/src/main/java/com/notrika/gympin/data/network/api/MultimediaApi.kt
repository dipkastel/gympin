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
import java.io.File

interface MultimediaApi {
    @FormUrlEncoded
    @Headers("Accept:*/*")
    @POST(NetworkConstants.multimedia_add)
    fun multimediaAdd(
        @Field("multipartFile") image:File,
        @Field("MediaType") MediaType:String,
        @Field("title") title:String,
        @Field("description") description:String,
        @Field("categoryParam[0].id") catId:Long,
    ): Flowable<Response<OprationResult<Int>>>
}
