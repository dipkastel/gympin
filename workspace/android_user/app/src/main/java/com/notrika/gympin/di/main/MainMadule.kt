package com.notrika.gympin.di.main

import com.notrika.gympin.util.general.DisplayUtil
import dagger.Module
import dagger.Provides
import javax.inject.Inject

@Module
class MainMadule @Inject constructor() {

    @MainScope
    @Provides
    internal fun provideDisplayUtils(): DisplayUtil {
        return DisplayUtil()
    }



}
