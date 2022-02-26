package com.notrika.gympin.ui.main.sports.eventsList

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.model.res.Res_User_Event
import com.notrika.gympin.ui.main.InnerPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_events_list.*


class FragmentEventsList : InnerPageFragment() {

    private lateinit var viewModelList: ViewModelEventsList



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_events_list, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModelList = ViewModelProviders.of(this, providerFactory).get(ViewModelEventsList::class.java)
        fillList()
    }

    private fun fillList() {
        var contents = mockdatas().getMyEventsMockData(requireContext());
        var adapter = AdapterEventsList(requestManager)
        adapter.addItems(contents.data!!)
        rv_events.adapter =adapter
        rv_events.adapter?.notifyDataSetChanged();
        adapter.onEventSelectListener = object :AdapterEventsList.OnEventSelectListener{
            override fun click(item: Res_User_Event) {
                var action = FragmentEventsListDirections.eventsListToEvent()
                findNavController().navigate(action)
            }
        }
    }


}
