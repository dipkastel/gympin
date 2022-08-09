package com.notrika.gympin.ui.main.place

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import com.google.android.material.tabs.TabLayoutMediator
import com.notrika.gympin.R
import com.notrika.gympin.data.model.entity.mock_place
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.ui.main.place.subFragments.about.FragmentPlaceAbout
import com.notrika.gympin.ui.main.place.subFragments.facilities.FragmentPlaceFacilities
import com.notrika.gympin.ui.main.place.subFragments.reserve.FragmentPlaceReserve
import com.notrika.gympin.ui.main.place.subFragments.stall.FragmentStallReserve
import kotlinx.android.synthetic.main.fragment_main_place.*
import kotlinx.android.synthetic.main.fragment_places_content.*


class FragmentPlace() : MainPageFragment() {

    private lateinit var viewModel: ViewModelPlace


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_place, container, false)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelPlace::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        arguments?.let {
            var item = FragmentPlaceArgs.fromBundle(it).placeItem
            prepare(item)
        }

    }

    private fun prepare(item: mock_place) {
        preparePlaceImages()
        preparePages()
    }

    private fun preparePlaceImages() {
        var listItems = arrayListOf("https://picsum.photos/id/239/500/300","https://picsum.photos/id/238/500/300","https://picsum.photos/id/236/500/300","https://picsum.photos/id/237/500/300")
        val adapter = AdapterPlaceSlider();
        adapter.addItems(listItems)
        place_slider_view_pager.adapter=adapter
        TabLayoutMediator(slider_indicator, place_slider_view_pager){ tab, position ->}.attach()
    }

    private fun preparePages() {
        val adapter = AdapterPlacePager(activity!!,
            Pair(FragmentPlaceReserve(),"رزرو"),
            Pair(FragmentPlaceAbout(),"درباره مرکز"),
            Pair(FragmentPlaceFacilities(),"امکانات")
        )
        place_container.adapter=adapter
        TabLayoutMediator(place_tabs, place_container){ tab, position ->
            tab.text = adapter.fragments[position].second
        }.attach()
    }

}
