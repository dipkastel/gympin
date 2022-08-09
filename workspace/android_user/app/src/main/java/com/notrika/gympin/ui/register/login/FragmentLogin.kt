package com.notrika.gympin.ui.register.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavOptions
import com.cinematicket.cbar.models.CiBar_Action
import com.cinematicket.cbar.models.OnCibarButtonListener
import com.notrika.cbar.CiBar
import com.notrika.gympin.R
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_Login
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.network.HttpCode
import com.notrika.gympin.data.network.HttpErrors
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
            RequestForSendSms(et_phone_number.text.toString())
        }
        btn_submith_register.setOnClickListener{
            RegisterUserBeforeLogin(et_register_phone_number.text.toString(),et_register_name.text.toString())
        }
        btn_submith_activation_code.setOnClickListener{
            ActiveUser(et_activation_code.text.toString(),et_phone_number.text.toString())
        }
        changeMod("Login")


    }

    private fun ActiveUser(code: String ,phoneNumber:String) {

        if(code.length < 4||code.length > 4){
            et_activation_code.error = getString(R.string.activation_code_is_not_valid)
            return
        }else{
            et_activation_code.error = null
        }
        btn_submith_activation_code.isEnabled = false
        viewModel.requestLogin(Req_User_Login(phoneNumber,code)).observe(viewLifecycleOwner, Observer { result ->

            when (result.status) {
                Resource.Status.SUCCESS -> {
                    btn_submith_activation_code.isEnabled = true
                    result.data?.let { it ->
                        pocket.userToken = "Bearer "+it.token
                        pocket.refreshToken = it.refreshToken
                        it.id?.let {that-> pocket.userId=that }
                        it.phoneNumber?.let {that-> pocket.phoneNumber=that }
                        it.username?.let {that-> pocket.userName=that }
                        it.userRole?.let {that-> pocket.userRole=that[0].role!! }
                        openApp()
                        return@Observer
                    }
                    et_activation_code.error = getString(R.string.activation_code_is_not_valid)
                }
                Resource.Status.ERROR -> {
                    btn_submith_activation_code.isEnabled = true
                    et_activation_code.error = getString(R.string.activation_code_is_not_valid)
                }
                Resource.Status.LOADING -> {
                    btn_submith_activation_code.isEnabled = false
                }

            }
        })
    }

    private fun RequestForSendSms(phoneNumber:String) {
        if(phoneNumber.length < 11||!phoneNumber.startsWith("09")){
            et_phone_number.error = getString(R.string.phone_number_is_not_valid)
            return
        }else{
            et_phone_number.error = null
        }
        viewModel.requestSendSms(Req_User_SendSms(phoneNumber)).observe(viewLifecycleOwner, Observer { baseSetting ->

            btn_submith_phone_number.isEnabled = true
            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    changeMod("Activation")
                }
                Resource.Status.ERROR -> {
                    if(baseSetting.message=="user not found")
                        changeMod("Register")
                    else{
                        var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
                            override fun OnClick(view: View) {
                                RequestForSendSms(phoneNumber)
                            }
                        })
                        ciBar.createAlert(context as AppCompatActivity, baseSetting.message, CiBar.INFINITY_CBAR_DURATION, action).show()
                    }
                }
                Resource.Status.LOADING -> {
                    btn_submith_phone_number.isEnabled = false
                }

            }
        })
    }

    private fun changeMod(mode:String) {
        when(mode){
            "Activation"->{
                //start timer
                viewModel.counter = null
                viewModel.counter?.removeObservers(viewLifecycleOwner)
                frame_activate.visibility = View.VISIBLE
                frame_lagin.visibility = View.GONE
                frame_register.visibility = View.GONE

                //animation change view
//                val anim1 = AnimationUtils.loadAnimation(context, R.anim.enter_fall_down)
//                frame_activate.startAnimation(anim1)

//                val anim2 = AnimationUtils.loadAnimation(context, R.anim.exit_from_bottom)
//                frame_lagin.startAnimation(anim2)
                requsetSuccess(120*1000.toLong());
            }
            "Register"->{

                frame_activate.visibility = View.GONE
                frame_lagin.visibility = View.GONE
                frame_register.visibility = View.VISIBLE
                et_register_phone_number.text = et_phone_number.text

            }
            "Login"->{
                frame_activate.visibility = View.GONE
                frame_lagin.visibility = View.VISIBLE
                frame_register.visibility = View.GONE

            }
        }
    }

    private fun requsetSuccess(timeToCount:Long) {
        btn_resend_code.isEnabled = false
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

    private fun RegisterUserBeforeLogin(phonrNumber: String,UserName:String) {
        viewModel.requestRegister(Req_User_Register(phonrNumber,UserName)).observe(viewLifecycleOwner, Observer { baseSetting ->

            btn_submith_register.isEnabled = true
            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    et_phone_number.text = et_register_phone_number.text
                    RequestForSendSms(phonrNumber)
                }
                Resource.Status.ERROR -> {
                    if(baseSetting.errorCode==HttpCode.USER_NAME_EXIST)
                        et_register_name.error = HttpErrors.USER_NAME_EXIST
                    if(baseSetting.errorCode==HttpCode.USER_REGISTERD_BEFORE)
                        et_register_phone_number.error = HttpErrors.USER_REGISTERD_BEFORE
                }

                Resource.Status.LOADING -> {
                    btn_submith_register.isEnabled = false
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
