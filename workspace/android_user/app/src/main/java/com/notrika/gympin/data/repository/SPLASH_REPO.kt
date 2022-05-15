package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.res.Res_Application_Splash
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.network.request.BaseRequests
import com.notrika.gympin.util.extention.ErrorCheckEmpty
import javax.inject.Inject

class SPLASH_REPO @Inject constructor(
        private val baseRequests: BaseRequests,
        private val pocket: Pocket,
        private val db: DBStructure
) {

        fun observeBaseSetting(): LiveData<Resource<Res_Application_Splash>> {
                val Livedata = MediatorLiveData<Resource<Res_Application_Splash>>()
                val sourceApplicationSplash: LiveData<Resource<Res_Application_Splash>> = LiveDataReactiveStreams.fromPublisher(baseRequests.RequestSplash())
                Livedata.value = Resource.loading(null)


                Livedata.addSource(sourceApplicationSplash) { listResource ->
                        Livedata.removeSource(sourceApplicationSplash)
                        if (listResource?.status == Resource.Status.SUCCESS) {
                                Livedata.value = Resource.success(listResource.data)
                        } else {
                                Livedata.value = Resource.error(listResource.message.ErrorCheckEmpty(), listResource?.errorCode?:0)
                        }
                }

                return Livedata
        }
}
