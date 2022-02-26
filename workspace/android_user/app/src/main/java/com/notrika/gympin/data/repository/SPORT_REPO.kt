package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class SPORT_REPO @Inject constructor(
        private val sportRequests: SportRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAllSports(): LiveData<Resource<List<Res_sport>>> {
                val lData = MediatorLiveData<Resource<List<Res_sport>>>()
                val lStream: LiveData<Resource<List<Res_sport>>> = LiveDataReactiveStreams.fromPublisher(sportRequests.RequestGetAllSport())
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
