package com.notrika.gympin.ui.main.userProfile

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_Add_Follow
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_my_events
import com.notrika.gympin.data.repository.FOLLOW_REPO
import com.notrika.gympin.data.repository.USER_REPO
import com.notrika.gympin.data.repository.Walking_EVENTS_REPO
import javax.inject.Inject

class ViewModelUserProfile @Inject constructor(var userRepo: USER_REPO , var walkingEventsRepo: Walking_EVENTS_REPO,var followRepo: FOLLOW_REPO,var pocket: Pocket) : ViewModel() {

    lateinit var viewLifecycleOwner: LifecycleOwner

    fun GetUserDataById(userId:Long): LiveData<Resource<Res_User>> {
        return userRepo.observeGetUserById(userId)
    }
    fun GetUserDataByUserName(userName:String): LiveData<Resource<Res_User>> {
        return userRepo.observeGetUserByUsername(userName)
    }

    fun requestGetUserEvents(userId:Long): LiveData<Resource<Res_my_events>> {
        return walkingEventsRepo.observeGetAllEventOfUser(userId)
    }

    fun GetFollowers(userId:Long):LiveData<Resource<List<Res_User>>> {
        return followRepo.observeFollowers(userId)
    }

    fun GetFollowings(userId:Long):LiveData<Resource<List<Res_User>>> {
        return followRepo.observeFollowings(userId)
    }

    fun Follow(userId:Long):LiveData<Resource<Res_User>> {
        var req = Req_Add_Follow(userId,pocket.userId)
        return followRepo.observeFollow(req)
    }


}
