package com.notrika.gympin.ui.main.events.walking.eventWalking

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.req.Req_event_walking_add_participant
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_add_participent
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.repository.PARTICIPANT_REPO
import com.notrika.gympin.data.repository.Walking_EVENTS_REPO
import javax.inject.Inject

class ViewModelEventWalking @Inject constructor(var participantRepo: PARTICIPANT_REPO,var walkingEventsRepo: Walking_EVENTS_REPO) : ViewModel() {
    lateinit var viewLifecycleOwner: LifecycleOwner

    fun joinToEvent(id: Long): LiveData<Resource<Res_add_participent>> {
       return participantRepo.observeAddUser(id)
    }

    fun cancelJoinToEvent(id: Long): LiveData<Resource<Res_add_participent>> {
       return participantRepo.observeRemoveUser(id)
    }

    fun cancelEvent(id: Long): LiveData<Resource<Res_evets_walking>> {
        return walkingEventsRepo.observeDeleteWalkingEvents(id)
    }


}
