package com.notrika.gympin.ui.main.place.subFragments.facilities

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_facility
import com.notrika.gympin.data.model.entity.mock_reserve
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.ui.main.place.subFragments.stall.AdapterStall
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_place_facilities.*
import kotlinx.android.synthetic.main.fragment_place_reserve.*


class FragmentPlaceFacilities : InnerPageFragment() {

    private lateinit var viewModel: ViewModelPlaceFacilities



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_place_facilities, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelPlaceFacilities::class.java)
        prepare()
    }

    private fun prepare() {
        var contents = mockdatas().getfacilitiesMockData(requireContext())
        var adapter = Adapterfacilities(requestManager)
        rv_facilities.adapter = adapter
        adapter.addItems(contents.data!!)
        adapter.onItemClickListener = object : Adapterfacilities.OnItemClickListener {
            override fun click(item: mock_facility) {

            }
        }
    }

}
