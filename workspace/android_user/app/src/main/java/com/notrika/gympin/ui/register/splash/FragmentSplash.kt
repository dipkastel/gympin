package com.notrika.gympin.ui.register.splash

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavOptions
import androidx.navigation.Navigation
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.register.RegisterInnerPageFragment


class FragmentSplash : RegisterInnerPageFragment() {
    lateinit var viewModel: ViewModelSplash

    private lateinit var navOptions: NavOptions


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

        Handler().postDelayed({ getSplashData() }, 4000)
    }

    private fun getSplashData() {
        viewModel.requestSplash().observe(viewLifecycleOwner, Observer { SplashData->
            when(SplashData.status){
                Resource.Status.SUCCESS->{
                    LoginCheck()
                }
                Resource.Status.ERROR ->{
                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                        override fun OnClick(view: View) {
                            getSplashData()
                        }
                    })
                    ciBar.createAlert(context as AppCompatActivity, SplashData.message, CiBar.INFINITY_CBAR_DURATION, action).show()
                }
            }
        })
    }

    private fun LoginCheck() {
        if (pocket.userId<1) {
            Navigation.findNavController(this.requireView()).navigate(FragmentSplashDirections.splashToLogin())
        }else{
            openApp()
        }
    }

    private fun openApp() {
        activity?.finish()
        val myIntent = Intent(activity, ActivityMain::class.java)
        activity?.startActivity(myIntent)
    }


}
