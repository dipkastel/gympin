package com.notrika.gympin.ui.main.places.list

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.res.Res_User
import com.notrika.gympin.data.model.res.Res_place
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.data.repository.PLACE_REPO
import com.notrika.gympin.data.repository.PLAN_REPO
import javax.inject.Inject

class ViewModelPlacesList @Inject constructor(var planRepo: PLAN_REPO,var placeRepo: PLACE_REPO) : ViewModel() {
    lateinit var viewLifecycleOwner: LifecycleOwner

    fun getPlans(): LiveData<Resource<List<Res_plan>>> {
        return planRepo.observeAllPlans()
    }

    fun getPlacesById(id: Long): LiveData<Resource<List<Res_place>>> {
        return placeRepo.observeAllPlaces()
    }
}
