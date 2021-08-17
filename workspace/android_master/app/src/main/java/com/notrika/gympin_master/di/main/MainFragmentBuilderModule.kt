package com.notrika.gympin_master.di.main

import com.notrika.gympin_master.ui.main.myPlace.FragmentMyPlace
import com.notrika.gympin_master.ui.main.reserves.FragmentReserves
import com.notrika.gympin_master.ui.main.works.FragmentWorks
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun reserves_fragment(): FragmentReserves

    @ContributesAndroidInjector
    internal abstract fun works_fragment(): FragmentWorks

    @ContributesAndroidInjector
    internal abstract fun myplace_fragment(): FragmentMyPlace

}
