package com.notrika.gympin.ui.main.gympin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_gympin.*
import javax.inject.Inject


class FragmentGympin : MainPageFragment() {

    private lateinit var viewModel: ViewModelGympin

    @Inject
    lateinit var adapterMainGympin:AdapterGympinMain


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_gympin, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelGympin::class.java)
        fillList()
        activeHeaderButtons()
    }

    private fun activeHeaderButtons() {

        img_notif.setOnClickListener {
            val action = FragmentGympinDirections.toNotifs()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
        img_chat.setOnClickListener {

            val action = FragmentGympinDirections.toMessages()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
        img_coins.setOnClickListener {
            val action = FragmentGympinDirections.toCredit()
            try{findNavController().navigate(action)}catch (e:Exception){}
        }
    }

    private fun fillList() {
        rv_main.adapter =adapterMainGympin
        val data = mockdatas().getHomePageMockData(requireContext());
        adapterMainGympin.addItems(data.data!!)
    }

}
