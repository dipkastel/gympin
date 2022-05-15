package com.notrika.gympin.ui.register.splash

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.repository.SPLASH_REPO
import javax.inject.Inject

class ViewModelSplash @Inject
constructor(private val splashRepo: SPLASH_REPO) : ViewModel() {
    private val TAG: String = this.javaClass.name



    fun requestSplash(): LiveData<Resource<Res_Application_Splash>> {

        liveDataApplicationSplash = splashRepo.observeBaseSetting()
        return liveDataApplicationSplash

    }
    companion object {
        private val TAG = "SplashViewModel"
        lateinit var liveDataApplicationSplash : LiveData<Resource<Res_Application_Splash>>
    }
}
