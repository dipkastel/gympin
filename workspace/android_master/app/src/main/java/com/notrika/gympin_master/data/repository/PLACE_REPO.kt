package com.notrika.gympin_master.data.repository

import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.LiveData
import com.notrika.gympin_master.data.model.Res.Res_UserPlace
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.request.LocationRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class PLACE_REPO @Inject constructor(
        private val locationRequests: LocationRequests,
        private val networkSetting: Network_setting,
        private val pocket: Pocket,
        private val db: DBStructure
) {
        fun observeGetPlaceByUser(): LiveData<Resource<List<Res_UserPlace>>> {
                val Livedata = MediatorLiveData<Resource<List<Res_UserPlace>>>()
                val source: LiveData<Resource<List<Res_UserPlace>>> = LiveDataReactiveStreams.fromPublisher(locationRequests.RequestGetPlaceByUser())
                Livedata.value = Resource.loading(null)


                Livedata.addSource(source) { listResource ->
                        Livedata.removeSource(source)
                        if (listResource.data == null) {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        } else if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        }
                }

                return Livedata
        }

}
