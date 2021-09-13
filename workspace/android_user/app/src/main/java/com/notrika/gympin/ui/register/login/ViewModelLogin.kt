package com.notrika.gympin.ui.register.login

import android.os.CountDownTimer
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_Login
import com.notrika.gympin.data.model.req.Req_User_Register
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.repository.ACCOUNT_REPO
import okhttp3.ResponseBody
import javax.inject.Inject

class ViewModelLogin @Inject
constructor(private val accountRepo: ACCOUNT_REPO) : ViewModel() {


    var counter: MutableLiveData<Long>? = null

    fun resetCounter(timeToCount:Long){
        if(counter!=null)
            return

        counter = MutableLiveData()
        var timer= object: CountDownTimer(timeToCount,1000) {
            override fun onTick(millisUntilFinished: Long) {
                counter!!.value = millisUntilFinished
            }
            override fun onFinish() {
                counter!!.value = 0

            }
        }
        timer .start()

    }

    fun requestSendSms(reqSendsms:Req_User_SendSms): LiveData<Resource<Boolean>> {
        return accountRepo.observeSendSms(reqSendsms)
    }

    fun requestRegister(reqSendsms:Req_User_Register): LiveData<Resource<Res_User_Register>> {
        return accountRepo.observeRegister(reqSendsms)
    }

    fun requestLogin(reqUserLogin: Req_User_Login): LiveData<Resource<Res_User_Login>> {
        return accountRepo.observeLogin(reqUserLogin)
    }

}
