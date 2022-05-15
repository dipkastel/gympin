package com.notrika.gympin.ui.main.myEvents

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.model.res.Res_my_events
import com.notrika.gympin.data.repository.Walking_EVENTS_REPO
import javax.inject.Inject

class ViewModelMyEvents @Inject constructor(var walkingEventsRepo: Walking_EVENTS_REPO,var pocket: Pocket) : ViewModel() {


    lateinit var viewLifecycleOwner: LifecycleOwner

    fun requestGetMyEvents(): LiveData<Resource<Res_my_events>> {
        return walkingEventsRepo.observeGetAllEventOfUser(pocket.userId)
    }

}
