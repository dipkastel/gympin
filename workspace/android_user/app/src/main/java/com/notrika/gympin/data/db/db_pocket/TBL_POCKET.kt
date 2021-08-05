package com.notrika.gympin.data.db.db_pocket

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey


@Entity(tableName = "TBL_POCKET")
class TBL_POCKET(@field:PrimaryKey
                 @field:ColumnInfo(name = "POCKET_Key")
                 var pockeT_Key: String, @field:ColumnInfo(name = "POCKET_Value")
                 var pockeT_Value: String?)
