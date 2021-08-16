package com.notrika.gympin_master.data.db.db_network_setting

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
class TBL_network_settings {
    @PrimaryKey
    @ColumnInfo(name = "settings_key")
    var settings_key: String = ""
    @ColumnInfo(name = "settings_value")
    var settings_value: String? = null
    @ColumnInfo(name = "settings_detail")
    var settings_detail: String? = null


}

