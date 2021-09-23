package com.notrika.gympin_master.ui.main.settings

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.widget.PopupMenu
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.BaseActivity
import com.notrika.gympin_master.R
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.main.InnerPageFragment
import com.notrika.gympin_master.ui.main.MainPageFragment
import com.notrika.gympin_master.util.lottie.LoadingProgress
import kotlinx.android.synthetic.main.fragment_main_reserves.*
import kotlinx.android.synthetic.main.fragment_main_settings.*
import javax.inject.Inject


class FragmentSettings : InnerPageFragment() {

    private lateinit var viewModel: ViewModelSettings



    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_settings, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelSettings::class.java)
        (activity as ActivityMain).setHeaderTitle("تنظیمات")
        btn_change_current_place.text  = pocket.userCurrentPlace?.name
        btn_change_current_place.setOnClickListener { v: View ->
            showMenu(v)
        }
    }

    private fun showMenu(v: View) {
        val popup = PopupMenu(requireActivity(), v)
        pocket.userPlaces.forEach { place ->
            popup.menu.add(place.name)
        }
        popup.setOnMenuItemClickListener { it ->
            pocket.userPlaces.forEach { place ->
                if(place.name==it.toString()){
                    pocket.userCurrentPlace  = place
                }
            }
            (activity as BaseActivity).restart()
            true
        }
        popup.show()
    }

}
