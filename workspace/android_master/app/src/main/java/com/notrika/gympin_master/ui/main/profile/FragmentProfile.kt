package com.notrika.gympin_master.ui.main.profile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.R
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.main.InnerPageFragment
import com.notrika.gympin_master.ui.main.MainPageFragment
import com.notrika.gympin_master.util.lottie.LoadingProgress
import kotlinx.android.synthetic.main.fragment_main_reserves.*
import javax.inject.Inject


class FragmentProfile : InnerPageFragment() {

    private lateinit var viewModel: ViewModelProfile



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        (activity as ActivityMain).setHeaderTitle("پروفایل")
        return inflater.inflate(R.layout.fragment_main_profile, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelProfile::class.java)
    }

}
