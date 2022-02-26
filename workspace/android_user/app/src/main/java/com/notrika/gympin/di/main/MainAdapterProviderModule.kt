package com.notrika.gympin.di.main

import com.bumptech.glide.RequestManager
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
    internal fun provideAdapterMyEvents(requestManager: RequestManager): AdapterMyEvents {
        return AdapterMyEvents(requestManager)
    }

//
//    @MainScope
//    @Provides
//    internal fun provideAdapterMarket(
//            requestManager: RequestManager,
//    ): AdapterMarket {
//        return AdapterMarket(requestManager,networkSetting)
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterBoxOffice(
//            requestManager: RequestManager,
//    ): AdapterBoxOffice {
//        return AdapterBoxOffice(requestManager,networkSetting)
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterFastFilms(
//            requestManager: RequestManager,
//    ): AdapterFastFilms {
//        return AdapterFastFilms(requestManager, networkSetting)
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterFastSans(
//            requestManager: RequestManager,
//    ): AdapterFastSans {
//        return AdapterFastSans()
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterFastCount(
//            requestManager: RequestManager
//    ): AdapterFastCount {
//        return AdapterFastCount()
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterFastCinemas(
//            requestManager: RequestManager
//    ): AdapterFastCinemas {
//        return AdapterFastCinemas(requestManager, networkSetting)
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterCopons(): AdapterCopons {
//        return AdapterCopons()
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterTransactions(): AdapterTransactions {
//        return AdapterTransactions()
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterTickets(
//            requestManager: RequestManager
//    ): AdapterTickets {
//        return AdapterTickets(requestManager,networkSetting)
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterSearch(
//            requestManager: RequestManager
//    ): AdapterSearch {
//        return AdapterSearch(requestManager, networkSetting)
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterFastTime(
//    ): AdapterFastTimes {
//        return AdapterFastTimes()
//    }
//
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterMainNews(requestManager: RequestManager): AdapterMainNewsRecycler {
//        return AdapterMainNewsRecycler(requestManager, networkSetting)
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterSelectCinemaTimeTimes(): AdapterSelectCinemaTimeTimes {
//        return AdapterSelectCinemaTimeTimes()
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideAdapterSelectCinemaTimeCinemas( requestManager: RequestManager, pocket: Pocket): AdapterSelectCinemaTimeCinemas {
//        return AdapterSelectCinemaTimeCinemas(requestManager,networkSetting, pocket)
//    }


}
