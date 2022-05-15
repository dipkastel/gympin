package com.notrika.gympin.di.general

import com.notrika.gympin.data.network.api.AccountApi
import com.notrika.gympin.data.network.api.GympinApplicationApi
import com.notrika.gympin.di.general.utils.DiConstants
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named


@Module
class GeneralApiMadule @Inject constructor() {

    @Provides
    internal fun provideGympinApplicationApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): GympinApplicationApi {
        return retrofit.create(GympinApplicationApi::class.java)
    }

    @Provides
    internal fun provideUserApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): AccountApi {
        return retrofit.create(AccountApi::class.java)
    }


}

