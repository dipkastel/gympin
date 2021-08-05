package com.notrika.gympin.di


import androidx.lifecycle.ViewModelProvider

import com.notrika.gympin.util.viewmodel.ViewModelProviderFactory

import dagger.Binds
import dagger.Module

@Module
abstract class ViewModelFactoryModule {

    @Binds
    abstract fun bindViewModelFactory(modelProviderFactory: ViewModelProviderFactory): ViewModelProvider.Factory
}
