package com.notrika.gympin.di.general

import com.notrika.gympin.data.network.api.GympinApplicationApi
import com.notrika.gympin.data.network.api.UserApi
import com.notrika.gympin.di.DiConstants
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named


@Module
class GeneralMadule @Inject constructor() {

    @Provides
    internal fun provideGympinApplicationApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): GympinApplicationApi {
        return retrofit.create(GympinApplicationApi::class.java)
    }

}

