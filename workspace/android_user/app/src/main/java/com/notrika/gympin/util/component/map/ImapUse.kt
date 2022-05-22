package com.notrika.gympin.util.component.map

interface ImapUse {
    fun getSelectedPoints(): List<MapItemEntity>
    fun removePoint(itemEntity: MapItemEntity)
    fun addPoint(mapitem: MapItemEntity)
    fun clearPoints()
}

