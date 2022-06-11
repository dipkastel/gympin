package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.SportApi
import com.notrika.gympin.data.network.api.UserApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import org.reactivestreams.Publisher
import retrofit2.Response
import javax.inject.Inject

class UserRequests @Inject
constructor(val userApi: UserApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun RequestGetUserById(id:Long): Flowable<Resource<Res_User>> {
        return userApi.userGetById(id)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())
    }

    fun RequestGetUserByUserName(username:String): Flowable<Resource<Res_User>> {
        return userApi.userGetByUsername(username)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {
                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())
    }

    fun RequestSetUser(user: Res_User): Publisher<Resource<Res_User>> {

        return userApi.userUpdateUser(user)
            .onErrorReturn {
                Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
            }
            .map {
                ResultManager.OnOprationResult(it)
            }
            .subscribeOn(Schedulers.io())

    }


}

