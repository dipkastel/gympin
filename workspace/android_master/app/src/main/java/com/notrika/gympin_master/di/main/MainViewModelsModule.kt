package com.notrika.gympin_master.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.di.ViewModelKey
import com.notrika.gympin_master.ui.main.myPlace.ViewModelMyPlace
import com.notrika.gympin_master.ui.main.reserves.ViewModelReserves
import com.notrika.gympin_master.ui.main.works.ViewModelWorks
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class MainViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelReserves::class)
    abstract fun bindReservesViewModel(viewModelReserves: ViewModelReserves): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelWorks::class)
    abstract fun bindWorksViewModel(viewModelWorks: ViewModelWorks): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelMyPlace::class)
    abstract fun bindMyPlaceViewModel(viewModelMyplace: ViewModelMyPlace): ViewModel
}
