package com.notrika.gympin.ui.register

import android.os.Bundle
import com.bumptech.glide.RequestManager
import com.notrika.cbar.CiBar
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerFragment
import javax.inject.Inject


open class RegisterInnerPageFragment : DaggerFragment() {

    val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket
    @Inject
    lateinit var requestManager: RequestManager
    @Inject
    lateinit var providerFactory: ViewModelProviderFactory
    @Inject
    lateinit var ciBar: CiBar

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