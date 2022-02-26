package com.notrika.gympin.ui.main.events.event

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin.R
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.ui.main.events.createEvent.ViewModelCreateEvent


class FragmentEvent : MainPageFragment() {

    private lateinit var viewModel: ViewModelEvent



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_event , container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelEvent::class.java)

    }

}
