package com.notrika.gympin.ui.main.places.map

import android.content.Context
import android.os.Bundle
import android.os.StrictMode
import android.preference.PreferenceManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.fragment.findNavController
import com.notrika.gympin.R
import com.notrika.gympin.data.*
import com.notrika.gympin.ui.main.MainPageFragment
import com.notrika.gympin.ui.main.places.list.FragmentPlacesListDirections
import kotlinx.android.synthetic.main.fragment_main_places_map.*
import org.osmdroid.config.Configuration


class FragmentPlacesMap : MainPageFragment() {

    private lateinit var viewModelList: ViewModelPlacesMap



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val policy = StrictMode.ThreadPolicy.Builder().permitAll().build()
        StrictMode.setThreadPolicy(policy)
        Configuration.getInstance().load(context, PreferenceManager.getDefaultSharedPreferences(context))
        return inflater.inflate(R.layout.fragment_main_places_map, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModelList = ViewModelProviders.of(this, providerFactory).get(ViewModelPlacesMap::class.java)
        propare()
    }

    private fun propare() {
        btn_list.setOnClickListener {
            var action = FragmentPlacesMapDirections.placesMapToPlacesList()
            findNavController().navigate(action)
        }
    }

}
