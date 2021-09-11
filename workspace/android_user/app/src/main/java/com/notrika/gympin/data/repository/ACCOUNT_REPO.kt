package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.network.request.BaseRequests
import com.notrika.gympin.data.network.request.UserRequests
import com.notrika.gympin_master.util.setting.ErrorCheckEmpty
import okhttp3.ResponseBody
import javax.inject.Inject

class ACCOUNT_REPO @Inject constructor(
        private val UserRequests:UserRequests
) {

        fun observeSendSms(reqSendsms: Req_User_SendSms): LiveData<Resource<Res_User_SendSms>> {
                val Livedata = MediatorLiveData<Resource<Res_User_SendSms>>()
                val source = LiveDataReactiveStreams.fromPublisher(UserRequests.RequestSendSms(reqSendsms))
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

        fun observeRegister(): LiveData<Resource<Res_User_Register>> {
                val Livedata = MediatorLiveData<Resource<Res_User_Register>>()
                val source= LiveDataReactiveStreams.fromPublisher(UserRequests.RequestRegister())
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

        fun observeLogin(): LiveData<Resource<Res_User_Login>> {
                val Livedata = MediatorLiveData<Resource<Res_User_Login>>()
                val source = LiveDataReactiveStreams.fromPublisher(UserRequests.RequestLogin())
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

                return source
        }
}
