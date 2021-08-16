package com.notrika.gympin_master.data.model

class Resource<T>(val status: Status, val data: T?, val message: String) {

    enum class Status {
        SUCCESS, ERROR, LOADING,FAILURE,EMPTY
    }


    companion object {

        fun <T> success(data: T?): Resource<T> {
            return Resource(Status.SUCCESS, data, "")
        }

        fun <T> error(msg: String, data: T?): Resource<T> {
            return Resource(Status.ERROR, data, msg)
        }

        fun <T> failure(msg: String, data: T?): Resource<T> {
            return Resource(Status.FAILURE, data, msg)
        }

        fun <T> Empty(msg: String, data: T?): Resource<T> {
            return Resource(Status.EMPTY, data, msg)
        }

        fun <T> loading(data: T?): Resource<T> {
            return Resource(Status.LOADING, data, "")
        }
    }
}