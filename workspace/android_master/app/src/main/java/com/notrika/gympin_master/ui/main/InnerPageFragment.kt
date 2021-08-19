package com.notrika.gympin_master.ui.main

import android.os.Bundle
import android.view.View
import com.bumptech.glide.RequestManager
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.notrika.cbar.CiBar
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.util.general.Helper
import com.notrika.gympin_master.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerFragment
import javax.inject.Inject


open class InnerPageFragment : DaggerFragment() {

    @Inject
    lateinit var pocket: Pocket

    @Inject
    lateinit var requestManager: RequestManager

    @Inject
    lateinit var networkSetting: Network_setting

    @Inject
    lateinit var providerFactory: ViewModelProviderFactory

    @Inject
    lateinit var ciBar: CiBar

    val TAG: String = this.javaClass.name

    open var bottomNavigationView: BottomNavigationView? = null
    open var bottom_nav_shadow: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bottomNavigationView = activity?.findViewById(R.id.bottom_nav)
        bottom_nav_shadow = activity?.findViewById(R.id.bottom_nav_shadow)
    }

    override fun onResume() {
        super.onResume()
        hideBottomNav()

    }

    private fun hideBottomNav() {
        bottomNavigationView?.visibility = View.GONE
        bottom_nav_shadow?.visibility = View.GONE

    }

    override fun onStart() {
        super.onStart()
        Helper().hideKeyboard(requireActivity())
    }

}