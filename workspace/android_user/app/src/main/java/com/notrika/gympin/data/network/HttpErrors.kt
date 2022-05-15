package com.notrika.gympin.data.network

class HttpErrors {
    companion object{
        val USER_REGISTERD_BEFORE= "کاربر قبلا ثبت نام شده است"
        var NO_INTERNET_ACCESS = "خطا در برقراری ارتباط"
        var WRONG_CODE_ENTERED = "کد وارد شده معتبر نمی باشد"
        var UNKNOWN_ERROR = "خطا نامشخص در دریافت اطلاعات"
        var AUTH_ERROR = "خطا امنیت ، کاربری شما منقضی شده"
        var USER_NAME_EXIST = "نام کاربری انتخاب شده تکراری است"
    }
}