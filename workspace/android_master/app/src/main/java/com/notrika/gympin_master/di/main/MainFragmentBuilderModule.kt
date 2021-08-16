package com.notrika.gympin_master.di.main

import com.notrika.gympin_master.ui.main.reserves.FragmentReserves
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun reserves_fragment(): FragmentReserves

}
