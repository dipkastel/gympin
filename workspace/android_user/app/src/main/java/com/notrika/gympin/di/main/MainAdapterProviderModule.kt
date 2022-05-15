package com.notrika.gympin.di.main

import com.bumptech.glide.RequestManager
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.di.general.scops.MainScope
import com.notrika.gympin.ui.main.gympin.*
import com.notrika.gympin.ui.main.myEvents.AdapterMyEvents
import dagger.Module
import dagger.Provides
import javax.inject.Inject

@Module
class MainAdapterProviderModule @Inject constructor() {


    @MainScope
    @Provides
    internal fun provideAdapterGympinMain(requestManager: RequestManager,adapterSlider: AdapterSlider,adapterContentList: AdapterContentList,adapterDiscountList: AdapterDiscountList,adapterUserList: AdapterUserList): AdapterGympinMain {
        return AdapterGympinMain(requestManager,adapterSlider,adapterContentList,adapterDiscountList,adapterUserList)
    }

    @MainScope
    @Provides
    internal fun provideAdapterAdapterSlider(): AdapterSlider {
        return AdapterSlider()
    }
    @MainScope
    @Provides
    internal fun provideAdapterContentList(): AdapterContentList {
        return AdapterContentList()
    }

    @MainScope
    @Provides
    internal fun provideAdapterDiscountList(): AdapterDiscountList {
        return AdapterDiscountList()
    }

    @MainScope
    @Provides
    internal fun provideAdapterUserList(): AdapterUserList {
        return AdapterUserList()
    }

    @MainScope
    @Provides
    internal fun provideAdapterMyEvents(requestManager: RequestManager,pocket:Pocket): AdapterMyEvents {
        return AdapterMyEvents(requestManager,pocket)
    }

}
