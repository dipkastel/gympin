package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.req.Req_id
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.model.res.Res_my_events
import com.notrika.gympin.data.network.request.EventsRequests
import javax.inject.Inject

class Walking_EVENTS_REPO @Inject constructor(
        private val eventsRequests: EventsRequests,
        private val pocket: Pocket
) {

        fun observeAllWalkingEvents(): LiveData<Resource<List<Res_evets_walking>>> {
                val lData = MediatorLiveData<Resource<List<Res_evets_walking>>>()
                val lStream: LiveData<Resource<List<Res_evets_walking>>> = LiveDataReactiveStreams.fromPublisher(eventsRequests.requestGetWalkingEvents())
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
        fun observeAddWalkingEvents(req_event_walking: Req_event_walking_add): LiveData<Resource<Res_evets_walking>> {
                val lData = MediatorLiveData<Resource<Res_evets_walking>>()
                val lStream: LiveData<Resource<Res_evets_walking>> = LiveDataReactiveStreams.fromPublisher(eventsRequests.requestAddWalkingEvents(req_event_walking))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
        fun observeDeleteWalkingEvents(id:Long): LiveData<Resource<Res_evets_walking>> {
                var req = Req_id(id)
                val lData = MediatorLiveData<Resource<Res_evets_walking>>()
                val lStream: LiveData<Resource<Res_evets_walking>> = LiveDataReactiveStreams.fromPublisher(eventsRequests.requestDeleteWalkingEvents(req))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
        fun observeGetAllEventOfUser(userID: Long): LiveData<Resource<Res_my_events>> {
                val lData = MediatorLiveData<Resource<Res_my_events>>()
                val lStream: LiveData<Resource<Res_my_events>> = LiveDataReactiveStreams.fromPublisher(eventsRequests.requestGetAllEventOfUser(userID))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
