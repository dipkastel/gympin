package com.notrika.gympin_master.ui.main.settings

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.R
import com.notrika.gympin_master.ui.main.MainPageFragment
import com.notrika.gympin_master.util.lottie.LoadingProgress
import kotlinx.android.synthetic.main.fragment_main_reserves.*
import javax.inject.Inject


class FragmentSettings : MainPageFragment() {

    private lateinit var viewModel: ViewModelSettings



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_settings, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelSettings::class.java)
    }

}
