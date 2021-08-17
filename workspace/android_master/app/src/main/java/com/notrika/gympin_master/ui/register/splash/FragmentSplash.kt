package com.notrika.gympin_master.ui.register.splash

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.navigation.NavOptions
import com.notrika.gympin_master.R
import com.notrika.gympin_master.data.model.Resource
import com.notrika.gympin_master.ui.main.ActivityMain
import com.notrika.gympin_master.ui.register.RegisterInnerPageFragment


class FragmentSplash : RegisterInnerPageFragment() {
    private val TAG: String = this.javaClass.name
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
        Handler().postDelayed({ getBaseSettings() }, 1000)
    }

    private fun getBaseSettings() {
        viewModel.requestBaseSetting().observe(viewLifecycleOwner, Observer { baseSetting ->

            when (baseSetting.status) {
                Resource.Status.SUCCESS -> {
                    openApp()
                }
                Resource.Status.ERROR -> {
//                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            getBaseSettings()
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, baseSetting.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
                }

            }
        })
    }

//    private fun requsetSuccess(data: F_BaseModel) {
//
//
//        if (!data.appIsActive) {
//            deactiveApp(data.urlwhenAppDeactive)
//        } else if (data.updateForceStatus) {
//            forceUpdate(data.updateUrl)
//        } else if (!pocket.isUserRegister) {
//            Log.e(TAG, "F_phoneNumber : " + pocket.phoneNumber)
//            if (pocket.canSendSms)
//                Navigation.findNavController(this.view!!).navigate(FragmentSplashDirections.splashToGetPhone())
//            else
//                Navigation.findNavController(this.view!!).navigate(FragmentSplashDirections.splashToLogin(pocket.TempPhoneNumber!!))
//        } else if (networkSetting.userToken == "") {
//            if (SharedPreference(activity!!).getDate(SharedPreference.SH_KEY_INTRO_CHECKED) == "") {
//                Navigation.findNavController(this.view!!).navigate(FragmentSplashDirections.splashToIntroduction())
//            } else {
//                Navigation.findNavController(this.view!!).navigate(FragmentSplashDirections.splashToGetInfo())
//            }
//        } else checkToken()
//
//    }
//
//    private fun getBaseDatas() {
//        var countDownloads = 0
//        var completecountDownloads = 0
//        if (networkSetting.isCinemaTBLUpdateNeed) {
//
//            Log.e(TAG, "getbase-cinema")
//            countDownloads++
//            REQgetCinemas(object : OnDoneListener {
//                override fun onDone() {
//
//                    Log.e(TAG, "getbase-cinema-done")
//                    completecountDownloads++
//                    checkAppOpen(countDownloads, completecountDownloads)
//
//                }
//            })
//        }
//        if (networkSetting.isCategoriesTblUpdateNeed) {
//
//            Log.e(TAG, "getbase-categories")
//            countDownloads++
//            REQgetCategories(object : OnDoneListener {
//                override fun onDone() {
//                    Log.e(TAG, "getbase-categories-done")
//                    completecountDownloads++
//                    checkAppOpen(countDownloads, completecountDownloads)
//
//                }
//            })
//
//        }
//        if (networkSetting.isOnScreenTblUpdateNeed) {
//            Log.e(TAG, "getbase-onscreen")
//            countDownloads++
//            REQonScreen(object : OnDoneListener {
//                override fun onDone() {
//                    Log.e(TAG, "getbase-onscreen-done")
//                    completecountDownloads++
//                    checkAppOpen(countDownloads, completecountDownloads)
//
//                }
//            })
//
//        }
//        if (networkSetting.isBannersTblUpdateNeed) {
//            Log.e(TAG, "getbase-banners")
//            countDownloads++
//            REQgetBanners(object : OnDoneListener {
//                override fun onDone() {
//                    Log.e(TAG, "getbase-banners-done")
//                    completecountDownloads++
//                    checkAppOpen(countDownloads, completecountDownloads)
//
//                }
//            })
//
//        }
//        if (networkSetting.RegisteredOneSignalId == "") {
//            Log.e(TAG, "getbase-registerOnSignal")
//            countDownloads++
//            registerNotification(object : OnDoneListener {
//                override fun onDone() {
//                    Log.e(TAG, "getbase-registerOnSignal-done")
//                    completecountDownloads++
//                    checkAppOpen(countDownloads, completecountDownloads)
//
//                }
//            })
//
//        }
//        if (countDownloads > 0) {
////            _progressIndicator.visibility = View.GONE
//            _progressBar.visibility = View.VISIBLE
//            _progressBar.max = countDownloads
//        } else {
//            checkAppOpen(countDownloads, completecountDownloads)
//        }
//    }
//
//    private fun checkAppOpen(count: Int, complete: Int) {
//        _progressBar.progress = complete
//        if (count == complete) {
//            openApp()
//        }
//
//    }
//
//    private fun checkToken() {
//
//        viewModel.requestCheckToken().observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.SUCCESS -> {
//
//                    when (it.data?.status) {
//                        F_Check_Token.TokenStatusTypes.Ok -> {
//                            getBaseDatas()
//                        }
//                        F_Check_Token.TokenStatusTypes.Expire -> {
//                            refreshToken(object : OnRefreshTokenListener {
//                                override fun RefreshComplete() {
//
//                                    Log.e(TAG, "R-checkToken-res-refresh-complete")
//                                    getBaseDatas()
//                                }
//
//                                override fun RefreshFaild() {
//                                    Log.e(TAG, "R-checkToken-res-refresh-faild")
//                                    RestartApp()
//                                }
//
//                            })
//                        }
//                        F_Check_Token.TokenStatusTypes.Unregister -> {
//                            context?.toast("خطا در شناسایی کاربر", Toast.LENGTH_SHORT)
//                            Log.e(TAG, "F_R_message : " + it.message)
//                            Navigation.findNavController(this.view!!).navigate(FragmentSplashDirections.splashToGetPhone())
//
//                        }
//                        F_Check_Token.TokenStatusTypes.suspend -> {
//                            deactiveApp(NetworkConstants.BASE_webView_URL)
//                        }
//
//                    }
//                }
//                Resource.Status.ERROR -> {
//
//                    val action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            checkToken()
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//                Resource.Status.FAILURE -> {
//                    activity?.finish()
//                }
//            }
//        })
//    }
//
//    var crashCount = 0
//    fun RestartApp() {
//        pocket.deleteAll()
//        Helper.deleteCache(activity as Activity)
//        var intent = activity?.intent
//        Handler().postDelayed({
//            activity?.finish()
//            if (crashCount < 2)
//                activity?.startActivity(intent)
//            else
//                Toast.makeText(activity as Activity, "اجرای اپلیکیشن با خطا مواجه شد", Toast.LENGTH_SHORT).show()
//            crashCount++
//
//        }, 2000)
//    }
//
//    private fun refreshToken(OnRefreshTokenListener: OnRefreshTokenListener) {
//        viewModel.requestRefreshToken().observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    Log.e(TAG, "refreshToken-successs")
//                    if (it.data?.user_token.isNullOrEmpty()) {
//                        //if this you are here ,server side has a problem
//
//                        startActivity(Intent(activity, IntroActivity::class.java))
//                        activity?.finish()
//                        return@Observer
//                    }
//
//                    OnRefreshTokenListener.RefreshComplete()
//                }
//                Resource.Status.ERROR -> {
//                    Log.e(TAG, "refreshToken-faild")
//                    OnRefreshTokenListener.RefreshFaild()
//                }
//                Resource.Status.FAILURE -> {
//                    Log.e(TAG, "refreshToken-faild")
//                    OnRefreshTokenListener.RefreshFaild()
//                }
//            }
//
//        })
//    }
//
    private fun openApp() {
//        viewModel.requestUpdateUserProfile().observe(viewLifecycleOwner, Observer {
//
//            when (it.status) {
//                Resource.Status.SUCCESS -> {
                    activity?.finish()
                    val myIntent = Intent(activity, ActivityMain::class.java)
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
//
//
//    private fun REQgetCinemas(onDone: OnDoneListener) {
//
//        viewModel.requestGetCinemas(this).observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    onDone.onDone()
//                }
//                Resource.Status.ERROR -> {
//                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            REQgetCinemas(onDone)
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//            }
//        })
//    }
//
//    private fun REQgetCategories(onDoneListener: OnDoneListener) {
//        viewModel.requestGetCategories(this).observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    onDoneListener.onDone()
//                }
//                Resource.Status.ERROR -> {
//                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            REQgetCategories(onDoneListener)
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//                Resource.Status.FAILURE -> {
//
//                    refreshToken(object : OnRefreshTokenListener {
//                        override fun RefreshComplete() {
//                            Log.e(TAG, "REQgetCategories-refreshToken-success")
//                            REQgetCategories(onDoneListener)
//                        }
//
//                        override fun RefreshFaild() {
//                            Log.e(TAG, "REQgetCategories-refreshToken-faild")
//                            RestartApp()
//                        }
//
//                    })
//                }
//            }
//        })
//    }
//
//
//    private fun REQonScreen(onDoneListener: OnDoneListener) {
//
//        viewModel.requestGetOnScreen(this).observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    onDoneListener.onDone()
//                }
//                Resource.Status.ERROR -> {
//
//                    var action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            REQonScreen(onDoneListener)
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//
//                Resource.Status.FAILURE -> {
//                    refreshToken(object : OnRefreshTokenListener {
//                        override fun RefreshComplete() {
//                            Log.e(TAG, "REQonScreen-refreshToken-success")
//                            REQonScreen(onDoneListener)
//                        }
//
//                        override fun RefreshFaild() {
//                            Log.e(TAG, "REQonScreen-refreshToken-faild")
//                            RestartApp()
//                        }
//
//                    })
//                }
//            }
//        })
//    }
//
//    private fun REQgetBanners(onDoneListener: OnDoneListener) {
//        viewModel.requestGetBanners(this).observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    onDoneListener.onDone()
//                }
//                Resource.Status.ERROR -> {
//                    val action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            REQgetBanners(onDoneListener)
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//
//                Resource.Status.FAILURE -> {
//                    refreshToken(object : OnRefreshTokenListener {
//                        override fun RefreshComplete() {
//                            Log.e(TAG, "REQgetBanners-refreshToken-success")
//                            REQgetBanners(onDoneListener)
//                        }
//
//                        override fun RefreshFaild() {
//                            Log.e(TAG, "REQgetBanners-refreshToken-faild")
//                            RestartApp()
//                        }
//
//                    })
//                }
//            }
//        })
//    }
//
//
//    private fun registerNotification(onDoneListener: OnDoneListener) {
//        try {
//            var isComplete = false
//
//            val pushRegistrator = PushRegistratorGPS()
//            pushRegistrator.registerForPush(activity, Const.GOOGLE_SENDER_ID) { id, status ->
//                isComplete = true
//                val model = F_OneSignalDeviceModel()
//                model.identifier = id
//                model.appId = Const.ONESIGNAL_APP_ID
//                model.deviceModel = Build.MODEL
//                model.deviceType = "1"
//                model.deviceOs = Build.VERSION.RELEASE
//                model.deviceModel = Build.MODEL
//                model.notificationTypes = "1"
//                model.testType = "1"
//                model.gameVersion = BuildConfig.VERSION_CODE.toString()
//                activity?.runOnUiThread {
//                    viewModel.observeRegisterNotification(model).observe(viewLifecycleOwner, Observer {
//
//                        when (it.status) {
//                            Resource.Status.LOADING -> {
//                            }
//                            Resource.Status.SUCCESS -> {
//                                Log.e(TAG, "registerNotification-success")
//                                sendNotificationToken(object : OnDoneListener {
//                                    override fun onDone() {
//                                        Log.e(TAG, "getbase-sendNotifToken-done")
//                                        onDoneListener.onDone()
//                                        networkSetting.RegisteredOneSignalId = it.data?.data?.id?: ""
//                                    }
//                                })
//
//                            }
//                            Resource.Status.ERROR -> {
//                                Log.e(TAG, "registerNotification-erroe")
//                                onDoneListener.onDone()
//                            }
//                        }
//                    })
//                }
//
//            }
//
//            //if after 3000ms google not response for id
//            Handler().postDelayed({
//
//                Log.e(TAG, "registerNotification-3s-..-$isComplete")
//                if (!isComplete) {
//                    onDoneListener.onDone()
//                }
//
//            }, 3000)
//
//
//        } catch (e: Exception) {
//
//            Log.e(TAG, "registerNotification-terkid")
//            onDoneListener.onDone()
//        }
//
//
//    }
//
//
//    private fun sendNotificationToken(onDoneListener: OnDoneListener) {
//        viewModel.requestSendNotrificationToken(networkSetting.RegisteredOneSignalId).observe(viewLifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    onDoneListener.onDone()
//                }
//                Resource.Status.ERROR -> {
//                    Log.e(TAG, "sendNotificationToken-error")
//                    val action = CiBar_Action("تلاش مجدد", object : OnCibarButtonListener {
//                        override fun OnClick(view: View) {
//                            sendNotificationToken(onDoneListener)
//                        }
//                    })
//                    ciBar.createAlert(activity as Activity, it.message, CiBar.INFINITY_KSNACK_DURATION, action).show()
//                }
//            }
//        })
//    }
//
//    private fun deactiveApp(data: String) {
//        val dialog = CDialogAppIsDisable(MainActivity@ activity!!)
//        dialog.deactiveUrl = data
//        dialog.show()
//    }
//
//    private fun forceUpdate(updateUrl: String) {
//
//        var dialog = CDialogForceUpdate(MainActivity@ activity!!)
//        dialog.updateUrl = updateUrl
//        dialog.show()
//
//    }
}
