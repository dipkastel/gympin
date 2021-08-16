package com.notrika.gympin_master.ui.register

import android.os.Bundle
import com.bumptech.glide.RequestManager
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerFragment
import javax.inject.Inject


open class RegisterInnerPageFragment : DaggerFragment() {

    @Inject
    lateinit var pocket: Pocket
    @Inject
    lateinit var requestManager: RequestManager
    @Inject
    lateinit var networkSetting: Network_setting
    @Inject
    lateinit var providerFactory: ViewModelProviderFactory

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onResume() {
        super.onResume()

    }

    override fun onStart() {
        super.onStart()
    }

}