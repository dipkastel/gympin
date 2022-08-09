package com.notrika.gympin.ui.main.place.subFragments.stall

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_reserve
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_place_reserve.*


class FragmentStallReserve : InnerPageFragment() {

    private lateinit var viewModel: ViewModelStallReserve



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_place_stall, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelStallReserve::class.java)
        fillListReserve()
    }

    private fun fillListReserve() {
        var contents = mockdatas().getStallMockData(requireContext())
        var adapter = AdapterStall(requestManager)
        rv_reserve.adapter = adapter
        adapter.addItems(contents.data!!)
        adapter.onItemClickListener = object : AdapterStall.OnItemClickListener {
            override fun click(item: mock_reserve) {

            }
        }
    }

}
