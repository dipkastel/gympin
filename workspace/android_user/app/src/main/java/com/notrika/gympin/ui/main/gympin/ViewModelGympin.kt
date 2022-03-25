package com.notrika.gympin.ui.main.gympin

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_Home_Page
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.repository.MAIN_REPO
import javax.inject.Inject

class ViewModelGympin @Inject constructor(var mainRepo: MAIN_REPO) : ViewModel() {


    fun requestGetHomeData(): LiveData<Resource<List<Res_Home_Page>>> {
        return mainRepo.observeMainPageLayoutItem()
    }


}
