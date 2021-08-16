package com.notrika.gympin_master


import dagger.android.AndroidInjector
import dagger.android.DaggerApplication
import com.notrika.gympin_master.di.DaggerAppComponent

class BaseApplication : DaggerApplication() {

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {

        return DaggerAppComponent.builder().application(this).build()
    }
}
