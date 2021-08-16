package com.notrika.gympin_master.di.register

import com.notrika.gympin_master.ui.register.splash.FragmentSplash
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class RegisterFragmentBuilderModule {


    @ContributesAndroidInjector
    internal abstract fun splashFragment(): FragmentSplash
//
//    @ContributesAndroidInjector
//    internal abstract fun getPhoneFragment(): FragmentGetPhone
//
//    @ContributesAndroidInjector
//    internal abstract fun introductionFragment(): FragmentIntroduction
//
//    @ContributesAndroidInjector
//    internal abstract fun GetInfoFragment(): FragmentGetInfo
//
//
//    @ContributesAndroidInjector
//    internal abstract fun LoginFragment(): FragmentLogin

}
