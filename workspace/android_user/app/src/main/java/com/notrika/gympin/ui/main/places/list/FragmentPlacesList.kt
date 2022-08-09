package com.notrika.gympin.ui.main.places.list

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayout.OnTabSelectedListener
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.`interface`.onAuthorizeComplete
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.entity.mock_place
import com.notrika.gympin.data.model.res.Res_plan
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.util.mocks.mockdatas
import kotlinx.android.synthetic.main.fragment_main_places_list.*


class FragmentPlacesList : MainPageFragment() {

    private lateinit var viewModel: ViewModelPlacesList


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_main_places_list, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel =
            ViewModelProviders.of(this, providerFactory).get(ViewModelPlacesList::class.java)
        viewModel.viewLifecycleOwner = viewLifecycleOwner
        prepare()
    }

    private fun prepare() {
        btn_map.setOnClickListener {
            var action = FragmentPlacesListDirections.placesListToPlaceMap()
            findNavController().navigate(action)
        }
        getSelectedPlace(1)
    }

    private fun getSelectedPlace(id: Int) {
        var contents = mockdatas().getPlacesMockData(requireContext())
        var adapter = AdapterPlacesList()
        adapter.addItems(contents.data!!)
        adapter.onPlaceClick = object : AdapterPlacesList.OnPlaceClickListener {
            override fun Click(item: mock_place) {
                var action = FragmentPlacesListDirections.placesListToPlace(item)
                findNavController().navigate(action)
            }

        }
        rv_places.adapter = adapter
        rv_places.adapter?.notifyDataSetChanged();


    }


}
