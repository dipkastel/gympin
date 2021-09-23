package com.notrika.gympin_master.ui.main.works

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.R
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.main.MainPageFragment
import com.notrika.gympin_master.util.lottie.LoadingProgress
import kotlinx.android.synthetic.main.fragment_main_reserves.*
import javax.inject.Inject


class FragmentWorks : MainPageFragment() {

    private lateinit var viewModel: ViewModelWorks

    @Inject
    lateinit var loadingProgress: LoadingProgress


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        pocket.userCurrentPlace?.name?.let { (activity as ActivityMain).setHeaderTitle(it) }
        return inflater.inflate(R.layout.fragment_main_works, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelWorks::class.java)
        loadingProgress.addProgress(_main_layout, "ReservesLoading", LoadingProgress.Types.ReservesLoading)
    }

}
