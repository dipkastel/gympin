package com.notrika.gympin_master.ui.register.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.model.Req.Req_Login
import com.notrika.gympin_master.data.model.Req.Req_SendSms
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.register.ActivityRegister
import com.notrika.gympin_master.ui.register.RegisterInnerPageFragment
import kotlinx.android.synthetic.main.fragment_register_login.*


class FragmentLogin : RegisterInnerPageFragment() {
    lateinit var viewModel: ViewModelLogin




    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_register_login, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        androidInjector().inject(this)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelLogin::class.java)
        btn_submith_phone_number.setOnClickListener {
            RequestForSendSms()
        }
        btn_submith_activation_code.setOnClickListener {
            RequsetForLogin()
        }
        btn_resend_code.setOnClickListener {
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
        viewModel.requestSendSms(Req_SendSms(et_phone_number.text.toString())).observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    ActivationMode()
                }
                Resource.Status.ERROR -> {
                    et_phone_number.error = getString(R.string.can_not_send_sms_Now)
                }

            }
        })
    }

    private fun RequsetForLogin() {
        if(et_activation_code.text.toString().length < 4||et_activation_code.text.toString().length >4){
            et_activation_code.error = getString(R.string.activation_code_is_not_valid)
            return
        }else{
            et_activation_code.error = null
        }
        viewModel.requestLogin(Req_Login(et_phone_number.text.toString(),et_activation_code.text.toString())).observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    activity?.finish()
                    val myIntent = Intent(activity, ActivityRegister::class.java)
                    activity?.startActivity(myIntent)
                }
                Resource.Status.ERROR -> {
                    et_activation_code.error = getString(R.string.can_not_send_sms_Now)
                }

            }
        })
    }

    private fun ActivationMode() {
        //start timer
        viewModel.counter = null
        viewModel.counter?.removeObservers(viewLifecycleOwner)

        //animation change view
        frame_activate.visibility = View.VISIBLE
        val anim1 = AnimationUtils.loadAnimation(context, R.anim.enter_fall_down)
        frame_activate.startAnimation(anim1)

        val anim2 = AnimationUtils.loadAnimation(context, R.anim.exit_from_bottom)
        frame_lagin.startAnimation(anim2)
        frame_lagin.visibility = View.GONE
        requsetSuccess(120*1000);
    }


    private fun requsetSuccess(timeToCount:Long) {
        btn_resend_code.isEnabled = false
        Log.d(TAG,"success")
        viewModel.resetCounter(timeToCount)
        setCounterObserver()

    }

    fun setCounterObserver(){
        viewModel.counter?.observe(viewLifecycleOwner, Observer {
            if ((it / 1000).toInt() == 0) {
                btn_resend_code.text = resources.getString(R.string.resend)
                btn_resend_code.isEnabled = true
            }else {
                btn_resend_code.text = String.format(resources.getString(R.string.RemainTime), (it / 1000).toInt())
            }
        })
    }

}
