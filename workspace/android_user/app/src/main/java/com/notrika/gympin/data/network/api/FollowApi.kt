package com.notrika.gympin.data.network.api

import com.notrika.gympin.data.model.OprationResult
import com.notrika.gympin.data.model.req.Req_Add_Follow
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.network.NetworkConstants
import io.reactivex.Flowable
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Query

interface FollowApi {
    @GET(NetworkConstants.follow_followers)
    fun followGetfollowers(@Query("id") id:Long): Flowable<Response<OprationResult<List<Res_User>>>>
    @GET(NetworkConstants.follow_followings)
    fun followGetfollowings(@Query("id") id:Long): Flowable<Response<OprationResult<List<Res_User>>>>
    @POST(NetworkConstants.follow_add)
    fun followAddFollow(@Body reqAddFollow: Req_Add_Follow): Flowable<Response<OprationResult<Res_User>>>
}