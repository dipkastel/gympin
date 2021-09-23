package com.notrika.gympin_master.ui.register.splash

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.data.model.Res.Res_Splash
import com.notrika.gympin_master.data.model.Res.Res_UserPlace
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.repository.PLACE_REPO
import com.notrika.gympin_master.data.repository.SPLASH_REPO
import javax.inject.Inject

class ViewModelSplash @Inject
constructor(private val splashRepo: SPLASH_REPO,private val placeRepo: PLACE_REPO) : ViewModel() {
    private val TAG: String = this.javaClass.name

    fun requestSplash(): LiveData<Resource<Res_Splash>> {

        liveDataBaseSetting = splashRepo.observeBaseSetting()
        return liveDataBaseSetting

    }
    fun requestUserPlaces(): LiveData<Resource<List<Res_UserPlace>>> {

        liveDataUserPlaces = placeRepo.observeGetPlaceByUser()
        return liveDataUserPlaces

    }

    companion object {
        private val TAG = "SplashViewModel"
        lateinit var liveDataBaseSetting : LiveData<Resource<Res_Splash>>
        lateinit var liveDataUserPlaces : LiveData<Resource<List<Res_UserPlace>>>
    }
}
