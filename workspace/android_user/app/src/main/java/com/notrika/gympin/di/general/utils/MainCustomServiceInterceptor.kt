package com.notrika.gympin.di.general.utils

import com.notrika.gympin.data.db.db_pocket.Pocket
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject
import javax.inject.Singleton


@Singleton
class  MainCustomServiceInterceptor @Inject constructor(var pocket:Pocket) : Interceptor {


    fun setNewPocket(_pocket: Pocket) {
        this.pocket = _pocket
    }

    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val request = original.newBuilder()
        request.addHeader("Authorization", pocket.userToken)
        request.method(original.method(), original.body())
        return chain.proceed(request.build())
    }
}