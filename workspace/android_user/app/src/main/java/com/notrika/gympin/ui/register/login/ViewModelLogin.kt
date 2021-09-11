package com.notrika.gympin.ui.register.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import com.notrika.gympin.data.model.Resource
import com.notrika.gympin.data.model.req.Req_User_SendSms
import com.notrika.gympin.data.model.res.Res_User_Login
import com.notrika.gympin.data.model.res.Res_User_Register
import com.notrika.gympin.data.model.res.Res_User_SendSms
import com.notrika.gympin.data.repository.ACCOUNT_REPO
import okhttp3.ResponseBody
import javax.inject.Inject

class ViewModelLogin @Inject
constructor(private val accountRepo: ACCOUNT_REPO) : ViewModel() {
    private val TAG: String = this.javaClass.name



    fun requestSendSms(reqSendsms:Req_User_SendSms): LiveData<Resource<Res_User_SendSms>> {
        return accountRepo.observeSendSms(reqSendsms)
    }

    fun requestRegister(): LiveData<Resource<Res_User_Register>> {
        return accountRepo.observeRegister()
    }

    fun requestLogin(): LiveData<Resource<Res_User_Login>> {
        return accountRepo.observeLogin()
    }

    companion object {
        private val TAG = "LoginViewModel"
        lateinit var liveSendSms : LiveData<Resource<Res_User_SendSms>>
        lateinit var liveRegister : LiveData<Resource<Res_User_Register>>
        lateinit var liveLogin : LiveData<Resource<Res_User_Login>>
    }
}
