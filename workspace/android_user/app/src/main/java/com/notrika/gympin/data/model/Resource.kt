package com.notrika.gympin.data.model

class Resource<T> {
    var status: Status
    var data: T? = null
    var message: String
    var errorCode: Int? = null

    constructor(_status: Status, _data: T?, _message: String){
        status=_status
        data=_data
        message=_message
    }
    constructor(_status: Status, _errorCode: Int?, _message: String){
        status=_status
        errorCode=_errorCode
        message=_message
    }

    enum class Status {
        SUCCESS, ERROR, LOADING,FAILURE,EMPTY,UNAUTHORIZED
    }


    companion object {

        fun <T> success(data: T?): Resource<T> {
            return Resource(Status.SUCCESS, data, "")
        }

        fun <T> error(msg: String, errorCode: Int): Resource<T> {
            return Resource(Status.ERROR, errorCode, msg)
        }

        fun <T> failure(msg: String, data: T?): Resource<T> {
            return Resource(Status.FAILURE, data, msg)
        }

        fun <T> unauthorized(msg: String, data: T?): Resource<T> {
            return Resource(Status.UNAUTHORIZED, data, msg)
        }

        fun <T> Empty(msg: String, data: T?): Resource<T> {
            return Resource(Status.EMPTY, data, msg)
        }

        fun <T> loading(data: T?): Resource<T> {
            return Resource(Status.LOADING, data, "")
        }
    }
}