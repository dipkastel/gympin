package com.notrika.gympin.ui.main.place.subFragments.reserve

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_reserve
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_place_reserve.*


class FragmentPlaceReserve() : InnerPageFragment() {

    private lateinit var viewModel: ViewModelPlaceReserve

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_place_reserve, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelPlaceReserve::class.java)
        fillListReserve()
    }

    private fun fillListReserve() {
        var contents = mockdatas().getReserveMockData(requireContext())
        var adapter = AdapterReserve(requestManager)
        rv_reserve.adapter = adapter
        adapter.addItems(contents.data!!)
        adapter.onReserve = object : AdapterReserve.OnReserve {
            override fun reserve(item: mock_reserve) {
               var action = FragmentPlaceReserveDirections.toTickets()
                findNavController().navigate(action)
            }
        }
    }

}
