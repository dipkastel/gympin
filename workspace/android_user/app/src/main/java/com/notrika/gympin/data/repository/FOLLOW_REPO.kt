package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_Add_Follow
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.FollowRequests
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class FOLLOW_REPO @Inject constructor(
        private val followRequests: FollowRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeFollowers(id:Long): LiveData<Resource<List<Res_User>>> {
                val lData = MediatorLiveData<Resource<List<Res_User>>>()
                val lStream: LiveData<Resource<List<Res_User>>> = LiveDataReactiveStreams.fromPublisher(followRequests.RequestGetfollowers(id))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
        fun observeFollowings(id:Long): LiveData<Resource<List<Res_User>>> {
                val lData = MediatorLiveData<Resource<List<Res_User>>>()
                val lStream: LiveData<Resource<List<Res_User>>> = LiveDataReactiveStreams.fromPublisher(followRequests.RequestGetfollowings(id))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }

        fun observeFollow(req:Req_Add_Follow): LiveData<Resource<Res_User>> {
                val lData = MediatorLiveData<Resource<Res_User>>()
                val lStream: LiveData<Resource<Res_User>> = LiveDataReactiveStreams.fromPublisher(followRequests.RequestAddfollow(req))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
