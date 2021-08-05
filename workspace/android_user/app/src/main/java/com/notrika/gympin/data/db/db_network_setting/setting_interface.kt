package com.notrika.gympin.data.db.db_network_setting


import androidx.room.*

@Dao
interface setting_interface {


    @get:Query("SELECT*FROM TBL_network_settings")
    val all: List<TBL_network_settings>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(Settings: TBL_network_settings)

    @Update
    fun update(settingTable: TBL_network_settings)

    @Query("Delete FROM TBL_network_settings WHERE settings_key =:key")
    fun delete(key: String)
}

