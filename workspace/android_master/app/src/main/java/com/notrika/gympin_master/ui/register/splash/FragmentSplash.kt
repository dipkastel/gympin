package com.notrika.gympin_master.ui.register.splash

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavOptions
import androidx.navigation.Navigation
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.notrika.cbar.CiBar
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.register.RegisterInnerPageFragment


class FragmentSplash : RegisterInnerPageFragment() {
    lateinit var viewModel: ViewModelSplash

    private lateinit var navOptions: NavOptions


    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_register_splash, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        androidInjector().inject(this)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelSplash::class.java)
        navOptions = NavOptions.Builder()
                .setPopUpTo(R.id.register, true)
                .build()
        Handler().postDelayed({ getBaseSettings() }, 1000)
    }

    private fun getBaseSettings() {
        viewModel.requestBaseSetting().observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    loginCheck()
                }
                Resource.Status.ERROR -> {
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getBaseSettings()
                        }
                    })
                    ciBar.createAlert(activity as Activity, baseSetting.message, CiBar.INFINITY_CBAR_DURATION, action).show()
                }

            }
        })
    }

    private fun loginCheck() {
        if (pocket.userId<1) {
            Navigation.findNavController(this.requireView())
                .navigate(FragmentSplashDirections.registerSplashToLogin())
        }else{
            openApp()
        }
    }

    private fun openApp() {
//        viewModel.requestGetUserPlaces().observe(viewLifecycleOwner, Observer {
//
//            when (it.status) {
//                Resource.Status.SUCCESS -> {
                    activity?.finish()
                    val myIntent = Intent(activity, ActivityMain::class.java)
                    activity?.startActivity(myIntent)
//                }
//                Resource.Status.ERROR -> {
//
//                    val action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            openApp()
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//            }
//        })
    }
}
