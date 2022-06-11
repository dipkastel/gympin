package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.SportRequests
import com.notrika.gympin.data.network.request.UserRequests
import javax.inject.Inject

class USER_REPO @Inject constructor(
        private val userRequests: UserRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeGetUserById(id:Long): LiveData<Resource<Res_User>> {
                val lData = MediatorLiveData<Resource<Res_User>>()
                val lStream: LiveData<Resource<Res_User>> = LiveDataReactiveStreams.fromPublisher(userRequests.RequestGetUserById(id))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }

        fun observeGetUserByUsername(username:String): LiveData<Resource<Res_User>> {
                val lData = MediatorLiveData<Resource<Res_User>>()
                val lStream: LiveData<Resource<Res_User>> = LiveDataReactiveStreams.fromPublisher(userRequests.RequestGetUserByUserName(username))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }

        fun observeSetUser(user: Res_User): LiveData<Resource<Res_User>> {
                val lData = MediatorLiveData<Resource<Res_User>>()
                val lStream: LiveData<Resource<Res_User>> = LiveDataReactiveStreams.fromPublisher(userRequests.RequestSetUser(user))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
