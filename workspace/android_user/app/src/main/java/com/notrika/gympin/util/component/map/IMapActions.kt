package com.notrika.gympin.util.component.map

import android.content.Context

interface IMapActions {
    fun getcontext(): Context
    fun setAddress(data: MapItemEntity)
    fun invalidateView()
}