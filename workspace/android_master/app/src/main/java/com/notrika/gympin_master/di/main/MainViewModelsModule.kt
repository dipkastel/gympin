package com.notrika.gympin_master.di.main

import androidx.lifecycle.ViewModel
import com.notrika.gympin_master.di.ViewModelKey
import com.notrika.gympin_master.ui.main.reserves.ViewModelReserves
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class MainViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelReserves::class)
    abstract fun bindReservesViewModel(viewModelMainFilms: ViewModelReserves): ViewModel
}
