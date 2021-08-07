package com.notrika.gympin.common.exception;

public class PhoneNumberNotRegisterdException extends Throwable {
    public PhoneNumberNotRegisterdException() {
        super("user not registered before");
    }
}
