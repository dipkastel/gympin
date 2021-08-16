package com.notrika.gympin_master.data.db

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.notrika.gympin_master.data.db.db_network_setting.TBL_network_settings
import com.notrika.gympin_master.data.db.db_network_setting.setting_interface
import com.notrika.gympin_master.data.db.db_pocket.PocketDao
import com.notrika.gympin_master.data.db.db_pocket.TBL_POCKET

@Database(entities = arrayOf(
    TBL_POCKET::class,
        TBL_network_settings::class), version = 1, exportSchema = false)
abstract class DBStructure : RoomDatabase() {

    abstract fun pocketDao(): PocketDao

    abstract fun setting(): setting_interface


    companion object{

        var MIGRATION_27_28 = object : Migration(27, 28) {
            override fun migrate(database: SupportSQLiteDatabase) {

            }
        }

    }

}
