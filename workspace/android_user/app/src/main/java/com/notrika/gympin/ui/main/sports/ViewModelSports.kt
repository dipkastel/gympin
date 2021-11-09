package com.notrika.gympin.ui.main.sports

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_sport
import com.notrika.gympin.data.repository.SPORT_REPO
import javax.inject.Inject

class ViewModelSports @Inject constructor(var sportRepo: SPORT_REPO) : ViewModel() {

    fun requestGetAllSport(): LiveData<Resource<List<Res_sport>>> {
        return sportRepo.observeAllSports()
    }


}
