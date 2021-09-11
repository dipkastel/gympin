package com.notrika.gympin.ui.main

import android.os.Bundle
import android.util.TypedValue
import androidx.navigation.NavController
import com.notrika.gympin.BaseActivity
import com.notrika.gympin.data.db.db_network_setting.Network_setting
import com.notrika.gympin.data.db.db_pocket.Pocket
import javax.inject.Inject


class ActivityMain : BaseActivity() {

    private lateinit var navController: NavController

    private val TAG: String = this.javaClass.name

    @Inject
    lateinit var pocket: Pocket

    @Inject
    lateinit var networkSetting: Network_setting




    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

//        setContentView(R.layout.activity_main)
//        if (savedInstanceState == null) {
//            config()
//        }
//
//        requestVote()
//        Helper().setShakeListener(this, object : OnDoneListener {
//            override fun onDone() {
//                if (navController.currentDestination?.label != "FastOrder") {
//                    val action = MainDirections.toFastOrder()
//                    navController.navigate(action)
//                }
//            }
//
//        })
//        FloatingUpdate().init(this)
//        CheckKeyboard()
//        logger.ClogUser(pocket.userName)
    }


//    //TODO MOVE TO SEPERATE METHOD
//    private fun CheckKeyboard() {
//        activity_Layout.viewTreeObserver.addOnGlobalLayoutListener {
//
//
//            var r = Rect()
//            activity_Layout.getWindowVisibleDisplayFrame(r)
//            var screenHeight = activity_Layout.rootView.height
//            var keypadHeight = screenHeight - r.bottom
//
//            Log.d(TAG, "keypadHeight = " + keypadHeight);
//            var cbarBottomMargin = 0
//            if (keypadHeight > screenHeight * 0.15) {
//                cbarBottomMargin = keypadHeight
//            } else {
//                if (bottom_nav.visibility == View.VISIBLE) {
//                    cbarBottomMargin = getActionBarHeight()
//                } else {
//                    cbarBottomMargin = 0
//                }
//            }
//
//            ciBar.marginBottom = cbarBottomMargin
//        }
//    }

    //TODO MOVE TO UTILS
    fun getActionBarHeight(): Int {

        var actionBarHeight = 0
        val typedValue = TypedValue()

        try {

            if (theme.resolveAttribute(
                                    android.R.attr.actionBarSize,
                                    typedValue,
                                    true)) {

                actionBarHeight = TypedValue.complexToDimensionPixelSize(
                        typedValue.data,
                        resources
                                .displayMetrics)
            }

        } catch (ignore: Exception) {
        }

        return actionBarHeight
    }





//    private fun requestVote() {
//        Handler().postDelayed({
//            CheckVote()
//        }, 10000)
//    }

//    private fun CheckVote() {
//        mainRepo.observeCheckUserVote().observe(this as LifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//                }
//                Resource.Status.SUCCESS -> {
//                    val dialogVote = DialogVote(this, it.data!!, pocket)
//                    dialogVote.onSubmitClickListner = object : OnVoteSubmitClickListener {
//                        override fun onSubmit(result: HashMap<Int, Int>) {
//                            submitVote(result, it.data.checkUserVote!!.ReserveCode.trim().toInt(), it.data.checkUserVote!!.CinemaCode)
//                        }
//
//                    }
//                    dialogVote.show()
//                }
//
//                Resource.Status.FAILURE -> {
//
//                }
//                Resource.Status.ERROR -> {
//
//                }
//                Resource.Status.EMPTY -> {
//
//                }
//
//            }
//        })
//    }

//    private fun submitVote(result: java.util.HashMap<Int, Int>, reserveCode: Int, cinemaCode: Int) {
//        mainRepo.observeSendUserVote(F_SendCinemaVoteModel(result), reserveCode, cinemaCode).observe(this as LifecycleOwner, Observer {
//            when (it.status) {
//                Resource.Status.LOADING -> {
//
//                }
//                Resource.Status.SUCCESS -> {
//                    ciBar.createInfo(this, "نظر شما با موفقیت ثبت شد", CiBar.FAST_KSNACK_DURATION).show()
//                }
//                Resource.Status.FAILURE -> {
//
//                }
//                Resource.Status.ERROR -> {
//                    ciBar.createAlert(this, it.message, CiBar.FAST_KSNACK_DURATION).show()
//
//                }
//                Resource.Status.EMPTY -> {
//
//                }
//
//            }
//        })
//    }

//    override fun onRestoreInstanceState(savedInstanceState: Bundle?) {
//        super.onRestoreInstanceState(savedInstanceState)
//        config()
//    }
//
//    private fun config() {
//        navController = findNavController(R.id.nav_host_fragment_main)
//        navController.setGraph(R.navigation.main)
//        bottom_nav.setupWithNavController(navController)
//        supportActionBar?.hide()
//        bottom_nav.itemIconTintList = null
//    }
//
//    override fun onSupportNavigateUp(): Boolean {
//        return navController.navigateUp()
//    }
//
//    override fun onResume() {
//        super.onResume()
//
//        //back from payment
//        if (pocket.NotSuccededReserveCode != null && navController.currentDestination?.label != "Reserve") {
//
//            val date = intent.data
//            date?.getQueryParameter("order")?.let {
//                if (it == "0") {
//                    ciBar.createAlert(this, getString(R.string.peyment_faild), CiBar.FAST_KSNACK_DURATION).show()
//                    intent.data = null
//                    pocket.NotSuccededReserveCode = null
//                } else {
//                    val action = MainDirections.toReserve(pocket.NotSuccededReserveCode)
//                    navController.navigate(action)
//                }
//            }
//        }
//    }
//
//    private var exitTimer: Long = 0
//    override fun onBackPressed() {
//        if (navController.currentDestination?.id != R.id.main_films) {
//            super.onBackPressed()
//            return
//        }
//        if (exitTimer != 0.toLong()) {
//            finishAffinity()
//        } else {
//            ciBar.createAlert(this, resources.getString(R.string.pleaseclickAgainForExit), CiBar.FAST_KSNACK_DURATION).show()
//            val timer = object : CountDownTimer(3000, 100) {
//                override fun onTick(millisUntilFinished: Long) {
//                    exitTimer = millisUntilFinished
//                }
//
//                override fun onFinish() {
//                    exitTimer = 0
//                }
//            }
//            timer.start()
//        }
//    }
//
//    fun selectCinemaTab() {
//        bottom_nav.selectedItemId = R.id.main_cinemas
//    }
//
//    fun selectDiscount() {
//        bottom_nav.selectedItemId = R.id.main_discount
//    }
//
//    fun selectNews() {
//        bottom_nav.selectedItemId = R.id.main_news
//    }
//
//    fun selectOther() {
//        bottom_nav.selectedItemId = R.id.main_others
//    }

}
