package com.notrika.gympin_master.ui.register.login

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AnimationUtils
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavOptions
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.ui.register.RegisterInnerPageFragment
import kotlinx.android.synthetic.main.fragment_register_login.*


class FragmentLogin : RegisterInnerPageFragment() {
    private val TAG: String = this.javaClass.name
    lateinit var viewModel: ViewModelLogin


    private lateinit var navOptions: NavOptions


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_register_login, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        androidInjector().inject(this)
        viewModel = ViewModelProviders.of(this, providerFactory).get(ViewModelLogin::class.java)
        btn_submith_phone_number.setOnClickListener {
            SendActiveCode()
        }
        btn_submith_activation_code.setOnClickListener {
            SubmitActiveCode()
        }
        btn_resend_code.setOnClickListener {
            SendActiveCode()
        }
    }

    private fun SubmitActiveCode() {

    }

    private fun SendActiveCode() {
        if(et_phone_number.text.toString().length < 11||!et_phone_number.text.toString().startsWith("09")){
            et_phone_number.error = getString(R.string.phone_number_is_not_valid)
            return
        }else{
            et_phone_number.error = null
        }

        viewModel.requestSendSms(et_phone_number.text.toString()).observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    ActivationMode()
                }
                Resource.Status.ERROR -> {
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

    private fun getBaseSettings() {

    }

    private fun openApp() {
//        viewModel.requestUpdateUserProfile().observe(viewLifecycleOwner, Observer {
//
//            when (it.status) {
//                Resource.Status.SUCCESS -> {
//                    activity?.finish()
//                    val myIntent = Intent(activity, ActivityMain::class.java)
//                    try {
//
//                        if (activity?.intent?.hasExtra(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_PARAMS_KEY) == true
//                                && activity?.intent?.hasExtra(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_TYPE_KEY) == true) {
//                            val linkType: Int? = activity?.intent?.extras?.getInt(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_TYPE_KEY)
//                            val linkParams: String? = activity?.intent?.extras?.getString(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_PARAMS_KEY)
//                            if (linkType != null && linkParams != null) {
//                                myIntent.putExtra(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_TYPE_KEY, linkType)
//                                myIntent.putExtra(NotificationConstants.ONESIGNAL_NOTIFICAATION_LINK_PARAMS_KEY, linkParams)
//                            }
//                            myIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY or Intent.FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET or Intent.FLAG_ACTIVITY_MULTIPLE_TASK or Intent.FLAG_ACTIVITY_NEW_TASK)
//                        }
//                    } catch (e: java.lang.Exception) {
//
//                    }
//                    activity?.startActivity(myIntent)
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
