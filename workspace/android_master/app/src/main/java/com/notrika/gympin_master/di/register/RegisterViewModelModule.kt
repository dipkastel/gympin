package com.notrika.gympin_master.di.register

import com.notrika.gympin_master.ui.register.RegisterViewModel
import com.notrika.gympin_master.ui.register.splash.ViewModelSplash
import androidx.lifecycle.ViewModel
import dagger.Module
import dagger.Binds
import dagger.multibindings.IntoMap
import com.notrika.gympin_master.di.ViewModelKey

@Module
abstract class RegisterViewModelModule {
    @Binds
    @IntoMap
    @ViewModelKey(RegisterViewModel::class)
    abstract fun bindRegisterViewModel(viewModel: RegisterViewModel): ViewModel

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelSplash::class)
    abstract fun bindSplashViewModel(viewModel: ViewModelSplash): ViewModel
//
//    @Binds
//    @IntoMap
//    @ViewModelKey(ViewModelIntroduction::class)
//    abstract fun bindIntroductionViewModel(viewModel: ViewModelIntroduction): ViewModel
//
//
//    @Binds
//    @IntoMap
//    @ViewModelKey(ViewModelGetPhone::class)
//    abstract fun bindGetPhoneViewModel(viewModel: ViewModelGetPhone): ViewModel
//
//    @Binds
//    @IntoMap
//    @ViewModelKey(ViewModelGetInfo::class)
//    abstract fun bindGetInfoViewModel(viewModel: ViewModelGetInfo): ViewModel
//
//    @Binds
//    @IntoMap
//    @ViewModelKey(ViewModelLogin::class)
//    abstract fun bindLoginViewModel(viewModelLogin: ViewModelLogin): ViewModel

}
