package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.ParticipantsRequests
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class PARTICIPANT_REPO @Inject constructor(
        private val participantsRequests: ParticipantsRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAddUser(id:Long): LiveData<Resource<Res_add_participent>> {
                val lData = MediatorLiveData<Resource<Res_add_participent>>()
                val lStream: LiveData<Resource<Res_add_participent>> = LiveDataReactiveStreams.fromPublisher(participantsRequests.eventParticipantAdd(Req_event_walking_add_participant(id,pocket.userId)))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
        fun observeRemoveUser(id:Long): LiveData<Resource<Res_add_participent>> {
                val lData = MediatorLiveData<Resource<Res_add_participent>>()
                val lStream: LiveData<Resource<Res_add_participent>> = LiveDataReactiveStreams.fromPublisher(participantsRequests.eventParticipantRemove(Req_event_walking_add_participant(id,pocket.userId)))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
