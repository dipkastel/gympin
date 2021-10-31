package com.notrika.gympin.ui.main.gympin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.util.mocks.mockdatas


class FragmentGympin : MainPageFragment() {

    private lateinit var viewModel: ViewModelGympin



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_gympin, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelGympin::class.java)
        fillList()
    }

    private fun fillList() {
        val data = mockdatas().getHomePageMockData(requireContext());
    }

}
