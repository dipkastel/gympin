package com.notrika.gympin_master.data.repository

import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.LiveData
import com.notrika.gympin_master.data.model.F_BaseModel
import com.notrika.gympin_master.data.model.Res_Splash
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.request.AccountRequests
import com.notrika.gympin_master.data.network.request.BaseRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class ACCOUNT_REPO @Inject constructor(
        private val accountRequests: AccountRequests,
        private val networkSetting: Network_setting,
        private val pocket: Pocket,
        private val db: DBStructure
) {
        fun observeSendSms(phoneNumber :String): LiveData<Resource<Boolean>> {
                val LivedataBaseSetting = MediatorLiveData<Resource<Boolean>>()
                val sourceSplash: LiveData<Resource<Boolean>> = LiveDataReactiveStreams.fromPublisher(accountRequests.RequestSendSms(phoneNumber))
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
