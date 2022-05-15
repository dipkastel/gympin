package com.notrika.gympin.di.general

import androidx.lifecycle.ViewModel
import com.notrika.gympin.di.general.utils.viewModel.ViewModelKey
import com.notrika.gympin.ui.common.fullScreenMap.ViewModelFullScreenMap
import dagger.Binds
import dagger.Module
import dagger.multibindings.IntoMap

@Module
abstract class GeneralViewModelsModule {

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelFullScreenMap::class)
    abstract fun bindGympinViewModel(viewModel: ViewModelFullScreenMap): ViewModel

}
