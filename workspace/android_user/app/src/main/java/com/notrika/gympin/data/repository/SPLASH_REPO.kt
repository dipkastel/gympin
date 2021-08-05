package com.notrika.gympin.data.repository

import androidx.lifecycle.*
import javax.inject.Inject
import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.db.DBStructure

class SPLASH_REPO @Inject constructor(
        private val networkSetting: Network_setting,
        private val pocket: Pocket,
        private val db: DBStructure
) {

}
