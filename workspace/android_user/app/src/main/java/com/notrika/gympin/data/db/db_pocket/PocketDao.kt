package com.notrika.gympin.data.db.db_pocket

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface PocketDao {

    @get:Query("SELECT * FROM TBL_POCKET")
    val all:LiveData<List<TBL_POCKET>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(pocket: TBL_POCKET)

    @Update(onConflict = OnConflictStrategy.REPLACE)
    fun update(pocket: TBL_POCKET)

    @Delete
    fun delete(pocket: List<TBL_POCKET>)
    @Delete
    fun delete(pocket: TBL_POCKET)
}
