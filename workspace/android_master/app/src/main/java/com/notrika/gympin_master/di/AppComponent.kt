package com.notrika.gympin_master.di

import android.app.Application
import dagger.BindsInstance
import dagger.Component
import dagger.android.AndroidInjector
import dagger.android.support.AndroidSupportInjectionModule
import javax.inject.Singleton
import com.notrika.gympin_master.BaseApplication

@Singleton
@SuppressWarnings("unchecked")
@Component(modules = [
    AndroidSupportInjectionModule::class,
    ActivityBuilderModule::class,
    AppModule::class,
    ViewModelFactoryModule::class
])
interface  AppComponent   : AndroidInjector<BaseApplication> {



    @SuppressWarnings("unchecked")
    @Component.Builder
    interface Builder {

        @BindsInstance
        fun application(application: Application): Builder

        fun build(): AppComponent
    }

}
