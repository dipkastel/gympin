package com.notrika.gympin.ui.main.events.walking.eventListWalking

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.repository.Walking_EVENTS_REPO
import javax.inject.Inject

class ViewModelEventListWalking @Inject constructor(var walkingEventsRepo: Walking_EVENTS_REPO) : ViewModel() {
    lateinit var viewLifecycleOwner: LifecycleOwner

    fun requestGetAllSport(): LiveData<Resource<List<Res_evets_walking>>> {
        return walkingEventsRepo.observeAllWalkingEvents()
    }

}
