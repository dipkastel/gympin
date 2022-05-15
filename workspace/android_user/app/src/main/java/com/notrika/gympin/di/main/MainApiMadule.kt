package com.notrika.gympin.di.main

import com.notrika.gympin.data.network.api.*
import com.notrika.gympin.di.general.scops.MainScope
import com.notrika.gympin.di.general.utils.DiConstants
import com.notrika.gympin.util.general.DisplayUtil
import dagger.Module
import dagger.Provides
import retrofit2.Retrofit
import javax.inject.Inject
import javax.inject.Named


@Module
class MainApiMadule @Inject constructor() {

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

    @Provides
    internal fun provideEventsApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): EventsApi {
        return retrofit.create(EventsApi::class.java)
    }

    @Provides
    internal fun provideFollowApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): FollowApi {
        return retrofit.create(FollowApi::class.java)
    }

    @Provides
    internal fun provideUserApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): UserApi {
        return retrofit.create(UserApi::class.java)
    }

    @Provides
    internal fun provideParticipantApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): ParticipantApi {
        return retrofit.create(ParticipantApi::class.java)
    }


    @Provides
    internal fun provideRateApi(@Named(DiConstants.retrofit_gympin_main) retrofit: Retrofit): RateApi {
        return retrofit.create(RateApi::class.java)
    }

    @Provides
    internal fun provideMapApi(@Named(DiConstants.retrofit_gympin_map) retrofit: Retrofit): MapApi {
        return retrofit.create(MapApi::class.java)
    }

}
