package com.notrika.gympin.di.main

import com.notrika.gympin.ui.main.gympin.FragmentGympin
import com.notrika.gympin.ui.main.places.FragmentPlaces
import com.notrika.gympin.ui.main.profile.FragmentProfile
import com.notrika.gympin.ui.main.reserves.FragmentReserves
import com.notrika.gympin.ui.main.settings.FragmentSettings
import com.notrika.gympin.ui.main.sports.FragmentSports
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentBuilderModule {

    @ContributesAndroidInjector
    internal abstract fun sport_fragment(): FragmentSports
    @ContributesAndroidInjector
    internal abstract fun places_fragment(): FragmentPlaces
    @ContributesAndroidInjector
    internal abstract fun reserves_fragment(): FragmentReserves
    @ContributesAndroidInjector
    internal abstract fun gympin_fragment(): FragmentGympin
    @ContributesAndroidInjector
    internal abstract fun profile_fragment(): FragmentProfile
    @ContributesAndroidInjector
    internal abstract fun settings_fragment(): FragmentSettings
}
