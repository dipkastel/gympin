package com.notrika.gympin.di.general


import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.network.api.GympinApplicationApi
import com.notrika.gympin.data.network.request.BaseRequests
import dagger.Module
import dagger.Provides
import javax.inject.Inject

@Module
class GeneralRequestesModule @Inject constructor() {

    @Provides
    internal fun provideSplashRequests(gympinApplicationApi: GympinApplicationApi, pocket : Pocket): BaseRequests {
        return BaseRequests(gympinApplicationApi,pocket)
    }
}
