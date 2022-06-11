package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.MultimediaApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import java.io.File
import javax.inject.Inject


class MultimediaRequests @Inject
constructor(val multimediaApi: MultimediaApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun multimediaAdd(file: File): Flowable<Resource<Int>> {
        val filePart = MultipartBody.Part.createFormData("multipartFile[0]",file.name,
            RequestBody.create(MediaType.parse("IMAGE"), file)
        )
        return multimediaApi.multimediaAdd(filePart)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
}

