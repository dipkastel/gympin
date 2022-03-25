package com.notrika.gympin.di.main

import com.notrika.gympin.data.network.api.AccountApi
import com.notrika.gympin.data.network.api.MainApi
import com.notrika.gympin.data.network.api.SportApi
import com.notrika.gympin.di.DiConstants
import com.notrika.gympin.util.general.DisplayUtil
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named

@Module
class MainMadule @Inject constructor() {

    @MainScope
    @Provides
    internal fun provideDisplayUtils(): DisplayUtil {
        return DisplayUtil()
    }


    @Provides
    internal fun provideSportApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): SportApi {
        return retrofit.create(SportApi::class.java)
    }

    @Provides
    internal fun provideMainApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): MainApi {
        return retrofit.create(MainApi::class.java)
    }

}
