package com.notrika.gympin_master.ui.register

class RegisterResource<T>(val status: RegisterStatus, val data: T?, val message: String?) {

    enum class RegisterStatus {
        AUTHENTICATED, ERROR, LOADING, NOT_AUTHENTICATED
    }

    companion object {

        fun <T> authenticated(data: T?): RegisterResource<T> {
            return RegisterResource(RegisterStatus.AUTHENTICATED, data, null)
        }

        fun <T> error(msg: String, data: T?): RegisterResource<T> {
            return RegisterResource(RegisterStatus.ERROR, data, msg)
        }

        fun <T> loading(data: T?): RegisterResource<T> {
            return RegisterResource(RegisterStatus.LOADING, data, null)
        }

        fun <T> logout(): RegisterResource<T> {
            return RegisterResource(RegisterStatus.NOT_AUTHENTICATED, null, null)
        }
    }

}