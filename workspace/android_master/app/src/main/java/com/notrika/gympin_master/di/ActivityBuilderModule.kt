package com.notrika.gympin_master.di


import com.notrika.gympin_master.di.general.GeneralMadule
import com.notrika.gympin_master.di.main.*
import com.notrika.gympin_master.di.register.RegisterFragmentBuilderModule
import com.notrika.gympin_master.di.register.RegisterModule
import com.notrika.gympin_master.di.register.RegisterScope
import com.notrika.gympin_master.di.register.RegisterViewModelModule
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.register.ActivityRegister
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ActivityBuilderModule {

    @RegisterScope
    @ContributesAndroidInjector(modules = [
        RegisterFragmentBuilderModule::class,
        RegisterViewModelModule::class,
        RequestesModule::class,
        GeneralMadule::class,
        RegisterModule::class])
    internal abstract fun contributeRegisterActivity(): ActivityRegister

    @MainScope
    @ContributesAndroidInjector(modules = [
        MainFragmentBuilderModule::class,
        MainViewModelsModule::class,
        MainRepositoryModule::class,
        MainDialogsMadule::class,
        RequestesModule::class,
        GeneralMadule::class,
        MainMadule::class,
        MainAdapterProviderModule::class])
    internal abstract fun contributeMainActivity(): ActivityMain

//    @ContributesAndroidInjector(modules = [
//        GeneralMadule::class
//    ])
//    internal abstract fun contributePlayerActivity(): ActivityPlayer



}
