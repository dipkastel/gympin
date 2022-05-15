package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_map_data
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.MapRequests
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class MAP_REPO @Inject constructor(
        private val mapRequests: MapRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAddress(lat:Double, lon:Double): LiveData<Resource<Res_map_data>> {
                val lData = MediatorLiveData<Resource<Res_map_data>>()
                val lStream: LiveData<Resource<Res_map_data>> = LiveDataReactiveStreams.fromPublisher(mapRequests.RequestGetAddress(lat,lon))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
