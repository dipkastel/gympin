package com.notrika.gympin.util.extention

import saman.zamani.persiandate.PersianDate
import java.text.SimpleDateFormat
import java.util.*


internal fun String?.ErrorCheckEmpty(): String {
    return if(this.isNullOrBlank()) "خطا در دریافت اطلاعات" else this
}

fun String?.getMiniAddress(): String {
    return this.let {
        return@let when {
            it.isNullOrBlank()->{
                "ثبت نشده"
            }
            it.split(",")[1].isNotBlank() -> {
                it.split(",")[1]
            }
            it.split(",")[0].isNotBlank() -> {
                it.split(",")[0]
            }
            else -> {
                "ثبت نشده"
            }
        }
    }
}


fun String?.toPersianDate(): PersianDate {
    return PersianDate(this.toDate())
}

fun Date?.toStringDateFormat(): String? {
    var FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    val sdf = SimpleDateFormat(FORMAT)
    return sdf.format(this)
}


fun Long?.toPersianDate(): PersianDate {
    return PersianDate(this)
}

fun Date?.toPersianDate(): PersianDate {
    return PersianDate(this)
}


fun String?.toDate(): Date {
    val sourceFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
    return sourceFormat.parse(this)
}

