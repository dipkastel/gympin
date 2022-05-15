package com.notrika.gympin.di


import com.notrika.gympin.di.general.*
import com.notrika.gympin.di.general.scops.MainScope
import com.notrika.gympin.di.main.*
import com.notrika.gympin.di.register.RegisterFragmentBuilderModule
import com.notrika.gympin.di.register.RegisterModule
import com.notrika.gympin.di.general.scops.RegisterScope
import com.notrika.gympin.di.register.RegisterViewModelModule
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.register.ActivityRegister
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityBuilderModule {

    @RegisterScope
    @ContributesAndroidInjector(modules = [
        GeneralFragmentBuilderModule::class,
        GeneralViewModelsModule::class,
        GeneralDialogsMadule::class,
        GeneralApiMadule::class,
        RegisterFragmentBuilderModule::class,
        RegisterViewModelModule::class,
        GeneralRequestesModule::class,
        RegisterModule::class])
    internal abstract fun contributeRegisterActivity(): ActivityRegister

    @MainScope
    @ContributesAndroidInjector(modules = [
        GeneralFragmentBuilderModule::class,
        GeneralViewModelsModule::class,
        GeneralDialogsMadule::class,
        GeneralApiMadule::class,
        MainFragmentBuilderModule::class,
        MainViewModelsModule::class,
        MainRepositoryModule::class,
        MainDialogsMadule::class,
        GeneralRequestesModule::class,
        MainApiMadule::class,
        MainAdapterProviderModule::class])
    internal abstract fun contributeMainActivity(): ActivityMain

//    @ContributesAndroidInjector(modules = [
//        GeneralMadule::class
//    ])
//    internal abstract fun contributePlayerActivity(): ActivityPlayer



}
