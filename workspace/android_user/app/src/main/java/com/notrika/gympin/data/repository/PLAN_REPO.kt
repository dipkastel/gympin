package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.ParticipantsRequests
import com.notrika.gympin.data.network.request.PlansRequests
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class PLAN_REPO @Inject constructor(
        private val plansRequests: PlansRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAllPlans(): LiveData<Resource<List<Res_plan>>> {
                val lData = MediatorLiveData<Resource<List<Res_plan>>>()
                val lStream: LiveData<Resource<List<Res_plan>>> = LiveDataReactiveStreams.fromPublisher(plansRequests.RequestGetAllPlans())
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
