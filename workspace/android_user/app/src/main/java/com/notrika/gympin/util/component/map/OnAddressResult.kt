package com.notrika.gympin.util.component.map

import com.notrika.gympin.data.model.res.Res_map_data

interface OnAddressResult {
    fun onResult(responses: Res_map_data)
    fun onFailed()
}