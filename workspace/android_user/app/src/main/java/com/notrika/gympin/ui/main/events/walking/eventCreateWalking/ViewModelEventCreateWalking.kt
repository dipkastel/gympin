package com.notrika.gympin.ui.main.events.walking.eventCreateWalking

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_event_walking_add
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_evets_walking
import com.notrika.gympin.data.model.res.Res_map_data
import com.notrika.gympin.data.repository.FOLLOW_REPO
import com.notrika.gympin.data.repository.Walking_EVENTS_REPO
import com.notrika.gympin.data.repository.MAP_REPO
import org.osmdroid.util.GeoPoint
import javax.inject.Inject

class ViewModelEventCreateWalking @Inject constructor(var followRepo: FOLLOW_REPO ,var walkingEventsRepo: Walking_EVENTS_REPO, var mapRepo: MAP_REPO,var pocket: Pocket) : ViewModel() {

    lateinit var viewLifecycleOwner: LifecycleOwner

    fun requestAddWalkingEvent(reqEventWalkingAdd: Req_event_walking_add): LiveData<Resource<Res_evets_walking>> {
        return walkingEventsRepo.observeAddWalkingEvents(reqEventWalkingAdd)
    }

    fun requestGetAddress(geoPoint: GeoPoint): LiveData<Resource<Res_map_data>> {
        return mapRepo.observeAddress(geoPoint.latitude,geoPoint.longitude)
    }

    fun GetFollowings():LiveData<Resource<List<Res_User>>> {
        return followRepo.observeFollowings(pocket.userId)
    }
}
