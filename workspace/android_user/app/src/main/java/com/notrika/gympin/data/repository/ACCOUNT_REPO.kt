package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_Login
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_Refresh_Token
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.network.request.AccountRequests
import com.notrika.gympin.util.extention.ErrorCheckEmpty
import javax.inject.Inject

class ACCOUNT_REPO @Inject constructor(
        private val UserRequests:AccountRequests
) {

        fun observeSendSms(reqSendsms: Req_User_SendSms): LiveData<Resource<Boolean>> {
                val Livedata = MediatorLiveData<Resource<Boolean>>()
                val source = LiveDataReactiveStreams.fromPublisher(UserRequests.RequestSendSms(reqSendsms))
                Livedata.value = Resource.loading(null)


                Livedata.addSource(source) { listResource ->
                        Livedata.removeSource(source)
                        if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), listResource?.errorCode?:0)
                        }
                }

                return Livedata
        }

        fun observeRegister(reqSendsms:Req_User_Register): LiveData<Resource<Res_User_Register>> {
                val Livedata = MediatorLiveData<Resource<Res_User_Register>>()
                val source= LiveDataReactiveStreams.fromPublisher(UserRequests.RequestRegister(reqSendsms))
                Livedata.value = Resource.loading(null)


                Livedata.addSource(source) { listResource ->
                        Livedata.removeSource(source)
                        if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), listResource?.errorCode?:0)
                        }
                }

                return Livedata
        }

        fun observeLogin(reqUserLogin: Req_User_Login): LiveData<Resource<Res_User_Login>> {
                val Livedata = MediatorLiveData<Resource<Res_User_Login>>()
                val source = LiveDataReactiveStreams.fromPublisher(UserRequests.RequestLogin(reqUserLogin))
                Livedata.value = Resource.loading(null)


                Livedata.addSource(source) { listResource ->
                        Livedata.removeSource(source)
                        if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), listResource?.errorCode?:0)
                        }
                }

                return source
        }

        fun observeRefresh(): LiveData<Resource<Res_Refresh_Token>> {
                val Livedata = MediatorLiveData<Resource<Res_Refresh_Token>>()
                val source = LiveDataReactiveStreams.fromPublisher(UserRequests.RequestRefreshToken())
                Livedata.value = Resource.loading(null)


                Livedata.addSource(source) { listResource ->
                        Livedata.removeSource(source)
                        if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), listResource?.errorCode?:0)
                        }
                }

                return source
        }
}
