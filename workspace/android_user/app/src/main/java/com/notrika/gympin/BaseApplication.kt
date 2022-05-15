package com.notrika.gympin


import com.jakewharton.threetenabp.AndroidThreeTen
import dagger.android.AndroidInjector
import dagger.android.DaggerApplication
import com.notrika.gympin.di.DaggerAppComponent
import com.notrika.gympin.ui.common.NotificationConstants
import com.notrika.gympin.ui.common.NotificationOpenedHandler
import com.onesignal.OneSignal

//import com.notrika.gympin.ui.common.NotificationOpenedHandler

class BaseApplication : DaggerApplication() {

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {
        val dagger = DaggerAppComponent.builder().application(this).build()


        OneSignal.initWithContext(applicationContext)

        OneSignal.setAppId(NotificationConstants.ONE_SIGNAL_ID);
        OneSignal.setNotificationOpenedHandler(NotificationOpenedHandler(this))
//
//        OneSignal.idsAvailable { notifId, registrationId ->
//            var i = ""
//        }
        return dagger
    }
}
