package com.notrika.gympin.di.register

import com.notrika.gympin.ui.register.login.FragmentLogin
import com.notrika.gympin.ui.register.splash.FragmentSplash
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class RegisterFragmentBuilderModule {


    @ContributesAndroidInjector
    internal abstract fun splashFragment(): FragmentSplash

    @ContributesAndroidInjector
    internal abstract fun loginFragment(): FragmentLogin

}
