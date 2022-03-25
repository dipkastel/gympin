package com.notrika.gympin.data.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.lifecycle.MediatorLiveData
import com.notrika.gympin.data.db.DBStructure
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.entity.Home_Item
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.network.request.MainRequests
import com.notrika.gympin.data.network.request.SportRequests
import javax.inject.Inject

class MAIN_REPO @Inject constructor(
        private val mainRequests: MainRequests
) {

        fun observeMainPageLayoutItem(): LiveData<Resource<List<Res_Home_Page>>> {
                val lData = MediatorLiveData<Resource<List<Res_Home_Page>>>()
                val lStream: LiveData<Resource<List<Res_Home_Page>>> = LiveDataReactiveStreams.fromPublisher(mainRequests.RequestGetHomeData(1))
                lData.value = Resource.loading(null)
                lData.addSource(lStream) { result ->
                        lData.removeSource(lStream)
                        lData.value =  result
                }
                return lData
        }
}
