package com.notrika.gympin.ui.main.myProfile.editProfile

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.repository.MULTIMEDIA_REPO
import com.notrika.gympin.data.repository.USER_REPO
import java.io.File
import javax.inject.Inject

class ViewModelEditProfile @Inject constructor(var userRepo: USER_REPO,var mediaRepo:MULTIMEDIA_REPO, var pocket: Pocket) : ViewModel() {

    lateinit var viewLifecycleOwner: LifecycleOwner
    fun GetUserData(): LiveData<Resource<Res_User>> {
        return userRepo.observeGetUserById(pocket.userId)
    }
    fun SetUserData(user:Res_User ): LiveData<Resource<Res_User>> {
        return userRepo.observeSetUser(user)
    }

    fun sendImageToServer(file:File):LiveData<Resource<Int>> {
       return mediaRepo.observeAddMedia(file);
    }

}
