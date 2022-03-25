package com.notrika.gympin.ui.main

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.RequestManager
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.db.db_pocket.Pocket
import com.notrika.gympin.data.enum.MainDestinationTypes
import com.notrika.gympin.ui.main.gympin.FragmentGympinDirections
import com.notrika.gympin.util.viewmodel.ViewModelProviderFactory
import dagger.android.support.DaggerFragment
import javax.inject.Inject


abstract class MainPageFragment : DaggerFragment() {

    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket

    @Inject
    lateinit var ciBar: CiBar

    @Inject
    lateinit var requestManager: RequestManager

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

        showBottomNav()
    }

    private fun showBottomNav() {
        bottomNavigationView?.visibility = View.VISIBLE
        bottom_nav_shadow?.visibility = View.VISIBLE
    }

    fun route(destination:MainDestinationTypes,data:String){

        when(destination){
            MainDestinationTypes.PLACES -> {
            }
            MainDestinationTypes.SPORTS -> {
                val view = bottomNavigationView!!.findViewById<View>(R.id.main_sports)
                view.performClick()
            }
            MainDestinationTypes.OUTERBROWSER -> {
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(data))
                startActivity(browserIntent)
            }
            MainDestinationTypes.INNERBROWSER -> {
                var action = FragmentGympinDirections.toBrowser(data)
                findNavController().navigate(action)
            }
            MainDestinationTypes.USERLIST -> {
            }
            MainDestinationTypes.PROFILE ->{
                var action = FragmentGympinDirections.toUserProfile(data)
                findNavController().navigate(action)
            }
            MainDestinationTypes.CONTENTS -> {
            }
            MainDestinationTypes.DISCOUNTS -> {
            }
            MainDestinationTypes.SINGLECONTENT -> {
            }
            MainDestinationTypes.SINGLEDISCOUNT -> {
            }
            MainDestinationTypes.INVITEFRIENDS -> {
            }
            MainDestinationTypes.SURVEYLIST -> {
                var action = FragmentGympinDirections.toSurvey()
                findNavController().navigate(action)
            }
            MainDestinationTypes.LOGOUT -> {
            }
        }
    }

}
