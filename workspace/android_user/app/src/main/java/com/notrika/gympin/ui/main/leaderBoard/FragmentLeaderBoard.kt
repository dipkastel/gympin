package com.notrika.gympin.ui.main.leaderBoard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.ActivityMain


class FragmentLeaderBoard : MainPageFragment() {

    private lateinit var viewModel: ViewModelLeaderBoard



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_leader_board, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelLeaderBoard::class.java)
    }

}
