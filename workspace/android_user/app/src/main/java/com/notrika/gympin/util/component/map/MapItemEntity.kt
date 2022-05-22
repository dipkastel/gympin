package com.notrika.gympin.util.component.map

import org.osmdroid.util.GeoPoint


class MapItemEntity(){
    constructor(geoPoint: GeoPoint) : this() {
        this.geoPoint = geoPoint
    }

    var geoPoint: GeoPoint? = null
    var address: String? =null
}
