package com.notrika.gympin_master.di.general

import com.notrika.gympin_master.data.network.api.AccountApi
import com.notrika.gympin_master.data.network.api.BaseApi
import com.notrika.gympin_master.di.DiConstants
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named


@Module
class GeneralMadule @Inject constructor() {


    @Provides
    internal fun provideBaseApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): BaseApi {
        return retrofit.create(BaseApi::class.java)
    }
    @Provides
    internal fun provideAccountApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): AccountApi {
        return retrofit.create(AccountApi::class.java)
    }
}

