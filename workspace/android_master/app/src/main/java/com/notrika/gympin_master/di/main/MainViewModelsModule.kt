package com.notrika.gympin_master.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.di.ViewModelKey
import com.notrika.gympin_master.ui.main.myPlace.ViewModelMyPlace
import com.notrika.gympin_master.ui.main.profile.ViewModelProfile
import com.notrika.gympin_master.ui.main.reserves.ViewModelReserves
import com.notrika.gympin_master.ui.main.settings.ViewModelSettings
import com.notrika.gympin_master.ui.main.works.ViewModelWorks
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class MainViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelReserves::class)
    abstract fun bindReservesViewModel(viewModel: ViewModelReserves): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelWorks::class)
    abstract fun bindWorksViewModel(viewModel: ViewModelWorks): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelMyPlace::class)
    abstract fun bindMyPlaceViewModel(viewModel: ViewModelMyPlace): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSettings::class)
    abstract fun bindSettingsViewModel(viewModel: ViewModelSettings): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelProfile::class)
    abstract fun bindProfileViewModel(viewModel: ViewModelProfile): ViewModel
}
