package com.notrika.gympin.di


import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.network.api.GympinApplicationApi
import com.notrika.gympin.data.network.request.BaseRequests
import dagger.Module
import dagger.Provides
import javax.inject.Inject

@Module
class RequestesModule @Inject constructor() {

    @Provides
    internal fun provideSplashRequests(gympinApplicationApi: GympinApplicationApi, pocket : Pocket, networkSetting : Network_setting): BaseRequests {
        return BaseRequests(gympinApplicationApi,pocket,networkSetting)
    }
}
