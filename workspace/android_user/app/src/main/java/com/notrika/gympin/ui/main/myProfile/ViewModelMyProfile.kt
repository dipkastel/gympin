package com.notrika.gympin.ui.main.myProfile

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.repository.FOLLOW_REPO
import com.notrika.gympin.data.repository.USER_REPO
import javax.inject.Inject

class ViewModelMyProfile @Inject constructor(var followRepo: FOLLOW_REPO, var userRepo:USER_REPO, var pocket: Pocket) : ViewModel() {

    lateinit var viewLifecycleOwner: LifecycleOwner
    fun GetFollowers():LiveData<Resource<List<Res_User>>> {
        return followRepo.observeFollowers(pocket.userId)
    }

    fun GetFollowings():LiveData<Resource<List<Res_User>>> {
        return followRepo.observeFollowings(pocket.userId)
    }

    fun GetUserData():LiveData<Resource<Res_User>> {
        return userRepo.observeGetUserById(pocket.userId)
    }





}
