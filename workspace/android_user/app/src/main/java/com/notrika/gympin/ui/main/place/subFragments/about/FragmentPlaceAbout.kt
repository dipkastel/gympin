package com.notrika.gympin.ui.main.place.subFragments.about

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.ui.main.place.subFragments.reserve.ViewModelPlaceReserve


class FragmentPlaceAbout : InnerPageFragment() {

    private lateinit var viewModel: ViewModelPlaceReserve



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_place_about, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelPlaceReserve::class.java)
    }

}
