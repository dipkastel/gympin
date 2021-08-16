package com.notrika.gympin_master.data.repository

import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.LiveData
import com.notrika.gympin_master.data.model.F_BaseModel
import com.notrika.gympin_master.data.model.OprationResult
import com.notrika.gympin_master.data.model.Res_BaseSetting
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.request.BaseRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class SPLASH_REPO @Inject constructor(
        private val baseRequests: BaseRequests,
        private val networkSetting: Network_setting,
        private val pocket: Pocket,
        private val db: DBStructure
) {
        fun observeBaseSetting(): LiveData<Resource<F_BaseModel>> {
                val LivedataBaseSetting = MediatorLiveData<Resource<F_BaseModel>>()
                val sourceBaseSetting: LiveData<Resource<Res_BaseSetting>> = LiveDataReactiveStreams.fromPublisher(baseRequests.RequestBaseSettingNow())
                LivedataBaseSetting.value = Resource.loading(null)


                LivedataBaseSetting.addSource(sourceBaseSetting) { listResource ->
                        LivedataBaseSetting.removeSource(sourceBaseSetting)
                        if (listResource.data == null) {
                                LivedataBaseSetting.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        } else if (listResource?.status == Resource.Status.SUCCESS) {
                                networkSetting.baseUrl = listResource.data.apiBase
                                networkSetting.baseMediaUrl = listResource.data.mediaBase
                                LivedataBaseSetting.value = Resource.success(listResource.data)
                        } else {
                                LivedataBaseSetting.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        }
                }

                return LivedataBaseSetting
        }

}
