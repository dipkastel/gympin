package com.notrika.gympin_master.data.repository

import com.notrika.gympin_master.data.db.DBStructure
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.LiveData
import com.notrika.gympin_master.data.model.Req_Login
import com.notrika.gympin_master.data.model.Req_SendSms
import com.notrika.gympin_master.data.model.Res_Login
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.data.network.request.AccountRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import javax.inject.Inject

class ACCOUNT_REPO @Inject constructor(
        private val accountRequests: AccountRequests,
        private val pocket: Pocket,
) {
        fun observeSendSms(phoneNumber :Req_SendSms): LiveData<Resource<Boolean>> {
                val Livedata = MediatorLiveData<Resource<Boolean>>()
                val sourceSplash: LiveData<Resource<Boolean>> = LiveDataReactiveStreams.fromPublisher(accountRequests.RequestSendSms(phoneNumber))
                Livedata.value = Resource.loading(null)


                Livedata.addSource(sourceSplash) { listResource ->
                        Livedata.removeSource(sourceSplash)
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

        fun observeLogin(login :Req_Login): LiveData<Resource<Res_Login>> {
                val Livedata = MediatorLiveData<Resource<Res_Login>>()
                val sourceSplash: LiveData<Resource<Res_Login>> = LiveDataReactiveStreams.fromPublisher(accountRequests.RequestLogin(login))
                Livedata.value = Resource.loading(null)
                Livedata.addSource(sourceSplash) { listResource ->
                        Livedata.removeSource(sourceSplash)
                        if (listResource.data == null) {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        } else if (listResource?.status == Resource.Status.SUCCESS) {
                                pocket.phoneNumber =  listResource.data.phoneNumber
                                pocket.userId =  listResource.data.id
                                pocket.userRole =  listResource.data.role
                                pocket.userToken =  listResource.data.token
                                pocket.userName =  listResource.data.username
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), null)
                        }
                }

                return Livedata
        }

}
