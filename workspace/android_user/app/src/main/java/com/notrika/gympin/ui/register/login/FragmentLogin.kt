package com.notrika.gympin.ui.register.login

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
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.ui.main.ActivityMain
import com.notrika.gympin.ui.register.RegisterInnerPageFragment
import kotlinx.android.synthetic.main.fragment_register_login.*


class FragmentLogin : RegisterInnerPageFragment() {


    lateinit var viewModel: ViewModelLogin

    private lateinit var navOptions: NavOptions


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_register_login, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelLogin::class.java)
        btn_submith_phone_number.setOnClickListener {
            RequestForSendSms()
        }

    }

    private fun RequestForSendSms() {
        if(et_phone_number.text.toString().length < 11||!et_phone_number.text.toString().startsWith("09")){
            et_phone_number.error = getString(R.string.phone_number_is_not_valid)
            return
        }else{
            et_phone_number.error = null
        }
        viewModel.requestSendSms(Req_User_SendSms(et_phone_number.text.toString())).observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    openApp()
                }
                Resource.Status.ERROR -> {

                    et_phone_number.error = baseSetting.message
                }

            }
        })
    }

    private fun openApp() {
        activity?.finish()
        val myIntent = Intent(activity, ActivityMain::class.java)
        activity?.startActivity(myIntent)
    }


}
