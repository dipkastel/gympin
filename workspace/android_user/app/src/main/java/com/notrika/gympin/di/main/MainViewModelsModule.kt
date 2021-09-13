package com.notrika.gympin.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin.di.ViewModelKey
import com.notrika.gympin.ui.main.gympin.ViewModelGympin
import com.notrika.gympin.ui.main.places.ViewModelPlaces
import com.notrika.gympin.ui.main.profile.ViewModelProfile
import com.notrika.gympin.ui.main.reserves.ViewModelReserves
import com.notrika.gympin.ui.main.settings.ViewModelSettings
import com.notrika.gympin.ui.main.sports.ViewModelSports
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class MainViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelGympin::class)
    abstract fun bindGympinViewModel(viewModel: ViewModelGympin): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelPlaces::class)
    abstract fun bindPlacesViewModel(viewModel: ViewModelPlaces): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelProfile::class)
    abstract fun bindProfileViewModel(viewModel: ViewModelProfile): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelReserves::class)
    abstract fun bindReservesViewModel(viewModel: ViewModelReserves): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSettings::class)
    abstract fun bindSettingsViewModel(viewModel: ViewModelSettings): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSports::class)
    abstract fun bindSportsViewModel(viewModel: ViewModelSports): ViewModel

}
