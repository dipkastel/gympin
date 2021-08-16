package com.notrika.gympin_master.di


import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.network.api.BaseApi
import com.notrika.gympin_master.data.network.request.BaseRequests
import dagger.Module
import dagger.Provides
import javax.inject.Inject

@Module
class RequestesModule @Inject constructor() {


    @Provides
    internal fun provideBaseRequests(baseApi: BaseApi, pocket : Pocket, networkSetting : Network_setting): BaseRequests {
        return BaseRequests(baseApi,pocket,networkSetting)
    }
}
