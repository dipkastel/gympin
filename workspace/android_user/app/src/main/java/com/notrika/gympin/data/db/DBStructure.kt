package com.notrika.gympin.data.db

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import com.notrika.gympin.data.db.db_pocket.PocketDao
import com.notrika.gympin.data.db.db_pocket.TBL_POCKET

@Database(entities = arrayOf(
    TBL_POCKET::class), version = 1, exportSchema = false)
abstract class DBStructure : RoomDatabase() {

    abstract fun pocketDao(): PocketDao

    companion object{

        var MIGRATION_27_28 = object : Migration(27, 28) {
            override fun migrate(database: SupportSQLiteDatabase) {

            }
        }

    }

}
