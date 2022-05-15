package com.notrika.gympin.data.network.request

import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_Add_Follow
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.ResultManager
import com.notrika.gympin.data.network.api.FollowApi
import io.reactivex.Flowable
import io.reactivex.schedulers.Schedulers
import okhttp3.internal.http.RealResponseBody
import retrofit2.Response
import javax.inject.Inject

class FollowRequests @Inject
constructor(val followApi: FollowApi, val pocket: Pocket) {

    private val TAG: String = this.javaClass.name

    fun RequestGetfollowers(id:Long): Flowable<Resource<List<Res_User>>> {
        return followApi.followGetfollowers(id)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }

    fun RequestGetfollowings(id:Long): Flowable<Resource<List<Res_User>>> {
        return followApi.followGetfollowings(id)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }
    fun RequestAddfollow(req:Req_Add_Follow): Flowable<Resource<Res_User>> {
        return followApi.followAddFollow(req)
                .onErrorReturn {
                    Response.error(HttpCode.Disconnected, RealResponseBody("null", 0, null))
                }
                .map {

                    ResultManager.OnOprationResult(it)
                }
                .subscribeOn(Schedulers.io())

    }



}

