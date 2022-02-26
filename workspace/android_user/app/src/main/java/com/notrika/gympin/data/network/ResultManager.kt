package com.notrika.gympin.data.network

import com.google.gson.Gson
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
                            Resource.error(it.message(), it.body()?.data)
                        }
                    }
                    HttpCode.HTTP_CREATED -> {
                        return if (it.isSuccessful) {
                            Resource.success(it.body()?.data)
                        } else {
                            Resource.error(it.message(), it.body()?.data)
                        }
                    }
                    HttpCode.Disconnected -> {
                        return Resource.error(HttpErrors.NO_INTERNET_ACCESS, it.body()?.data)
                    }
                    else -> {
                        var errors = getErrorMessage<E>(it.errorBody()?.string())
                        return Resource.error(errors, it.body()?.data)
                    }
                }

            } catch (e: Exception) {
                return Resource.failure(HttpErrors.UNKNOWN_ERROR, null)
            }
        }

        private fun <E>getErrorMessage(string: String?): String {
            val firstresult = Gson().fromJson<OprationResult<E>>(string, OprationResult::class.java)
            return  firstresult.message?:"خطا نا مشخص"
        }

    }

}