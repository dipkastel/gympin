package com.notrika.gympin_master.ui.main.myPlace

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.R
import com.notrika.gympin_master.ui.InnerPageFragment
import com.notrika.gympin_master.ui.MainPageFragment
import com.notrika.gympin_master.util.lottie.LoadingProgress
import kotlinx.android.synthetic.main.fragment_main_reserves.*
import javax.inject.Inject


class FragmentMyPlace : MainPageFragment() {

    private lateinit var viewModel: ViewModelMyPlace

    @Inject
    lateinit var loadingProgress: LoadingProgress


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_myplace, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelMyPlace::class.java)
        loadingProgress.addProgress(_main_layout, "ReservesLoading", LoadingProgress.Types.ReservesLoading)
    }

}
