package com.notrika.gympin_master.ui

import android.os.Bundle
import android.view.View
import com.bumptech.glide.RequestManager
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.db.db_network_setting.Network_setting
import com.notrika.gympin_master.data.db.db_pocket.Pocket
import com.notrika.gympin_master.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerFragment
import javax.inject.Inject


abstract class MainPageFragment : DaggerFragment() {

    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket
//
//    @Inject
//    lateinit var ciBar: CiBar

    @Inject
    lateinit var requestManager: RequestManager

    @Inject
    lateinit var networksetting: Network_setting

    @Inject
    lateinit var providerFactory: ViewModelProviderFactory

//    @Inject
//    lateinit var logger: Logger

    open var bottomNavigationView: BottomNavigationView? = null
    open var bottom_nav_shadow: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        bottomNavigationView = activity?.findViewById(R.id.bottom_nav)
        bottom_nav_shadow = activity?.findViewById(R.id.bottom_nav_shadow)

//        if(pocket.UpdateAvailableStatus != UpdateState.updated.Id) {
//            bottomNavigationView?.getOrCreateBadge(R.id.main_others)
//        }

    }

    override fun onResume() {
        super.onResume()

//        syncUser()
        showBottomNav()
    }

//    private fun syncUser() {
//
//        Glide.with(this).load(networksetting.baseWebViewUrl+"/"+ pocket.userImageUrl)
//                .placeholder(R.drawable.placeholder_userprofile)
//                .transform(
//                CenterCrop(), RoundedCorners(img_user!!.layoutParams.width / 2)).into(img_user)
//        pocket.LiveUserPoints.observe(this, Observer {
//            txt_user_score.text = it.toString()
//        })
//        img_user.setOnClickListener {
//            fragmentManager?.let {
//                val action = MainDirections.toUserProfile()
//                try{findNavController().navigate(action)}catch (e:Exception){logger.errorNavigation(TAG)}
//
//            }
//
//        }
//        img_user_score_badge.setOnClickListener {
//            fragmentManager?.let {
//                val action = MainDirections.toUserProfile()
//                try{findNavController().navigate(action)}catch (e:Exception){logger.errorNavigation(TAG)}
//            }
//        }
//        btn_search.setOnClickListener {
//            val action = MainDirections.toSearch()
//            try{findNavController().navigate(action)}catch (e:Exception){logger.errorNavigation(TAG)}
//        }
//    }


//    fun UNAUTHORIZED() {
//        ciBar.createAlert(activity as Activity, "دسترسی منقضی شده است", CiBar.FAST_KSNACK_DURATION).show()
//        activity?.finish()
//        val myIntent = Intent(activity, ActivityRegister::class.java)
//        activity?.startActivity(myIntent)
//    }

    private fun showBottomNav() {
        bottomNavigationView?.visibility = View.VISIBLE
        bottom_nav_shadow?.visibility = View.VISIBLE

    }
}
