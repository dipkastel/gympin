package com.notrika.gympin.data.network

import com.google.gson.Gson
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.Resource
import retrofit2.Response
import java.lang.reflect.Type

class ResultManager {
    companion object {
        fun <E> OnOprationResult(it: Response<OprationResult<E>>): Resource<E> {
            try {
                when (it.code()) {
                    HttpCode.HTTP_FORBIDDEN -> {
                        return Resource.unauthorized(HttpErrors.AUTH_ERROR, it.body()?.data)
                    }
                    HttpCode.HTTP_UNAUTHORIZED -> {
                        return Resource.unauthorized(HttpErrors.AUTH_ERROR, it.body()?.data)
                    }
                    HttpCode.HTTP_OK -> {
                        return if (it.isSuccessful) {
                            Resource.success(it.body()?.data)
                        } else {
                            var err = getErrorMessage(it.errorBody()?.string())
                            Resource.error(it.message(), err?.code!!)
                        }
                    }
                    HttpCode.HTTP_CREATED -> {
                        return if (it.isSuccessful) {
                            Resource.success(it.body()?.data)
                        } else {
                            var err = getErrorMessage(it.errorBody()?.string())
                            Resource.error(it.message(), err?.code!!)
                        }
                    }
                    HttpCode.Disconnected -> {
                        return Resource.error(HttpErrors.NO_INTERNET_ACCESS, 12163)
                    }
                    HttpCode.HTTP_BAD_REQUEST -> {
                        try{
                            var err = getErrorMessage(it.errorBody()?.string())
                            if(err?.code==1001){
                                return Resource.error("user not found", 1001)
                            }else{
                                return Resource.error(err?.errorMessage?:"نامشخص", err?.code!!)
                            }
                        }catch (e:Exception){
                            return Resource.error("ورودی نامعتبر", 400)
                        }
                    }
                    else -> {
                        var errors = getErrorMessage(it.errorBody()?.string())
                        return Resource.error(errors?.errorMessage?:"نامشخص", errors?.code!!)
                    }
                }

            } catch (e: Exception) {
                return Resource.failure(HttpErrors.UNKNOWN_ERROR, null)
            }
        }

        private fun getErrorMessage(string: String?): ErrorType? {
            val firstresult = Gson().fromJson(string, OprationErrorResult::class.java)
            return  firstresult.error
        }

    }

}
private class ErrorType(){

    @SerializedName("errorMessage")
    @Expose
    var errorMessage: String? = null
    @SerializedName("stackTrace")
    @Expose
    var stackTrace: String? = null
    @SerializedName("code")
    @Expose
    var code: Int? = 0
}
private class OprationErrorResult {

    @SerializedName("Success")
    @Expose
    var success: Boolean = false
    @SerializedName("MessageType")
    @Expose
    var messageType: Int? = null
    @SerializedName("Message")
    @Expose
    var message: String? = null
    @SerializedName("ResultDate")
    @Expose
    var resultDate: String? = null
    @SerializedName("LinkParams")
    @Expose
    var linkParams: String? = null
    @SerializedName("Error")
    @Expose
    var error: ErrorType? = null

}
