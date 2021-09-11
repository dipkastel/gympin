package com.notrika.gympin.ui.register.splash

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
//
//     fun requestGetCinemas(lifecycleOwner: LifecycleOwner): LiveData<Resource<List<F_Cinema>>> {
//
//       return splashRepo.observeGetAllCinemas(lifecycleOwner)
//
//    }
//
//     fun requestCheckToken(): LiveData<Resource<F_Check_Token>> {
//
//       return splashRepo.observeCheckToken()
//
//    }
//
//     fun requestRefreshToken(): LiveData<Resource<Res_RefreshCommonication>> {
//
//       return splashRepo.observeRefreshToken()
//
//    }
//
//    fun requestGetCategories(lifecycleOwner: LifecycleOwner): LiveData<Resource<List<F_Category>>> {
//
//        return splashRepo.observeGetAllCategories(lifecycleOwner)
//
//    }
//
//
//    fun requestSendNotrificationToken(playerId: String): LiveData<Resource<Any>> {
//
//        return splashRepo.observeSendNotificationId(playerId)
//
//    }
//
//
//    fun requestGetOnScreen(lifecycleOwner: LifecycleOwner): LiveData<Resource<List<F_Film>>> {
//
//        return splashRepo.observeOnScreenFilms(lifecycleOwner)
//
//    }
//
//
//
//    fun requestGetBanners(lifecycleOwner: LifecycleOwner): LiveData<Resource<List<F_Banner>>> {
//
//        return splashRepo.observebanner(lifecycleOwner)
//
//    }
//
//
//
//    fun observeRegisterNotification(model: F_OneSignalDeviceModel): LiveData<Resource<OprationResult<F_Register_Notification>>> {
//
//        return splashRepo.observeRegisterNotification(model)
//
//    }
//
//    fun requestUpdateUserProfile() :LiveData<Resource<F_User_Profile>> {
//        return splashRepo.observeUpdateUserProfile()
//    }

    companion object {
        private val TAG = "SplashViewModel"
        lateinit var liveDataApplicationSplash : LiveData<Resource<Res_Application_Splash>>
    }
}
