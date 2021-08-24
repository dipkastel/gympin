package com.notrika.gympin_master.data.network

import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Resource
import retrofit2.Response

class ResultManager {
    companion object {
        fun <E> OnOprationResult(it: Response<OprationResult<E>>): Resource<E> {
            try {
                when (it.code()) {
                    HttpCode.HTTP_FORBIDDEN -> {
                        return Resource.failure(HttpErrors.AUTH_ERROR, it.body()?.data)
                    }
                    HttpCode.HTTP_UNAUTHORIZED -> {
                        return Resource.failure(HttpErrors.AUTH_ERROR, it.body()?.data)
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
                        return Resource.error(it.message(), it.body()?.data)
                    }
                }

            } catch (e: Exception) {
                return Resource.error(HttpErrors.UNKNOWN_ERROR, null)
            }
        }
    }

}