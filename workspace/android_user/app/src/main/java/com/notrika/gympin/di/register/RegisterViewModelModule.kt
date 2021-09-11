package com.notrika.gympin.di.register

import com.notrika.gympin.ui.register.RegisterViewModel
import com.notrika.gympin.ui.register.splash.ViewModelSplash
import androidx.lifecycle.ViewModel
import dagger.Module
import dagger.Binds
import dagger.multibindings.IntoMap
import com.notrika.gympin.di.ViewModelKey
import com.notrika.gympin.ui.register.login.ViewModelLogin

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

    @Binds
    @IntoMap
    @ViewModelKey(ViewModelLogin::class)
    abstract fun bindLoginViewModel(viewModel: ViewModelLogin): ViewModel

}
