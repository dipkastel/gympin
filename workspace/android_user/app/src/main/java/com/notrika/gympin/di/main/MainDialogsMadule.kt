package com.notrika.gympin.di.main

import com.notrika.gympin.di.general.scops.MainScope
import com.notrika.gympin.ui.common.widgets.dialogConfirm.DialogConfirm
import com.notrika.gympin.ui.main.tickets.DialogQrCode
import dagger.Module
import dagger.Provides
import javax.inject.Inject


@Module
class MainDialogsMadule @Inject constructor(){


    @MainScope
    @Provides
    internal fun provideDialogQrCode(): DialogQrCode {
        return DialogQrCode()
    }

//    @MainScope
//    @Provides
//    internal fun provideCinemaFilterDialogs(activityMain: ActivityMain, dbStructure: DBStructure, pocket: Pocket): DialogCinemaFilter {
//        return DialogCinemaFilter(activityMain,dbStructure,pocket)
//    }
//
//    @MainScope
//    @Provides
//    internal fun provideDialogCitySelect(activityMain: ActivityMain, dbStructure: DBStructure, pocket: Pocket): DialogCitySelect {
//        return DialogCitySelect(activityMain,dbStructure,pocket)
//    }
}
