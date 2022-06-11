package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.network.request.MultimediaRequests
import java.io.File
import javax.inject.Inject

class MULTIMEDIA_REPO @Inject constructor(
        private val multimediaRequests: MultimediaRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAddMedia(file:File): LiveData<Resource<Int>> {
                val lData = MediatorLiveData<Resource<Int>>()
                val lStream: LiveData<Resource<Int>> = LiveDataReactiveStreams.fromPublisher(multimediaRequests.multimediaAdd(file))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
