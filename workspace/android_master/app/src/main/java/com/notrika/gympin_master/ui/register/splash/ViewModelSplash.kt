package com.notrika.gympin_master.ui.register.splash

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.data.model.Res_Splash
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.repository.SPLASH_REPO
import javax.inject.Inject

class ViewModelSplash @Inject
constructor(private val splashRepo: SPLASH_REPO) : ViewModel() {
    private val TAG: String = this.javaClass.name

    fun requestSplash(): LiveData<Resource<Res_Splash>> {

        liveDataBaseSetting = splashRepo.observeBaseSetting()
        return liveDataBaseSetting

    }

    companion object {
        private val TAG = "SplashViewModel"
        lateinit var liveDataBaseSetting : LiveData<Resource<Res_Splash>>
    }
}
