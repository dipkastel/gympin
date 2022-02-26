package com.notrika.gympin.ui.main.myEvents

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_my_events.*
import javax.inject.Inject


class FragmentMyEvents : MainPageFragment() {

    private lateinit var viewModel: ViewModelMyEvents


    @Inject
    lateinit var adapterMyEvents: AdapterMyEvents


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_my_events, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMyEvents::class.java)
        fillList()
    }

    private fun fillList() {
        rv_user_contents.adapter = adapterMyEvents
        val data = mockdatas().getMyEventsMockData(requireContext());
        adapterMyEvents.addItems(data.data!!)
    }

}
