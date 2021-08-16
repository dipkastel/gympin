package com.notrika.gympin_master.util.setting


internal fun String?.ErrorCheckEmpty(): String {
    return if(this.isNullOrBlank()) "خطا در دریافت اطلاعات" else this
}
