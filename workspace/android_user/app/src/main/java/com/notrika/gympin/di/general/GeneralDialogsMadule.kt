package com.notrika.gympin.di.general

import android.app.Activity
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.ui.common.widgets.dialogConfirm.DialogConfirm
import dagger.Module
import dagger.Provides
import javax.inject.Inject


@Module
class GeneralDialogsMadule @Inject constructor(){

    @Provides
    internal fun provideDialogConfirm(): DialogConfirm {
        return DialogConfirm()
    }
//
//    @MainScope
//    @Provides
//    internal fun provideDialogCitySelect(activityMain: ActivityMain, dbStructure: DBStructure, pocket: Pocket): DialogCitySelect {
//        return DialogCitySelect(activityMain,dbStructure,pocket)
//    }
}