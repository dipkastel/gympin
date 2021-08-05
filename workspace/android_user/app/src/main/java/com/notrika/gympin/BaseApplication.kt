package com.notrika.gympin


import dagger.android.AndroidInjector
import dagger.android.DaggerApplication
import com.notrika.gympin.di.DaggerAppComponent

class BaseApplication : DaggerApplication() {

    override fun applicationInjector(): AndroidInjector<out DaggerApplication> {

        return DaggerAppComponent.builder().application(this).build()
    }
}
