package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.SportRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class SPORT_REPO @Inject constructor(
        private val sportRequests: SportRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeAllSports(): LiveData<Resource<List<Res_sport>>> {
                val LivedataBaseSetting = MediatorLiveData<Resource<List<Res_sport>>>()
                val sourceApplicationSplash: LiveData<Resource<List<Res_sport>>> = LiveDataReactiveStreams.fromPublisher(sportRequests.RequestGetAllSport())
                LivedataBaseSetting.value = Resource.loading(null)


                LivedataBaseSetting.addSource(sourceApplicationSplash) { listResource ->
                        LivedataBaseSetting.removeSource(sourceApplicationSplash)
                        if (listResource.data == null) {
                                LivedataBaseSetting.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        } else if (listResource?.status == Resource.Status.SUCCESS) {
                                LivedataBaseSetting.value = Resource.success(listResource.data)
                        } else {
                                LivedataBaseSetting.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        }
                }

                return LivedataBaseSetting
        }
}
