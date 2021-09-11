package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Res_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.network.request.BaseRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class SPLASH_REPO @Inject constructor(
        private val baseRequests: BaseRequests,
        private val networkSetting: Network_setting,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeBaseSetting(): LiveData<Resource<Res_Splash>> {
                val LivedataBaseSetting = MediatorLiveData<Resource<Res_Splash>>()
                val sourceSplash: LiveData<Resource<Res_Splash>> = LiveDataReactiveStreams.fromPublisher(baseRequests.RequestSplash())
                LivedataBaseSetting.value = Resource.loading(null)


                LivedataBaseSetting.addSource(sourceSplash) { listResource ->
                        LivedataBaseSetting.removeSource(sourceSplash)
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
