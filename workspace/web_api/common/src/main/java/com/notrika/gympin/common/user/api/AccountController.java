package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AccountController {

    ResponseEntity<?> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase;

    ResponseEntity<?> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<?> loginUser(LoginParam loginParam) throws ExceptionBase;

    ResponseEntity<?> loginPanel(LoginParam loginParam) throws ExceptionBase;

    ResponseEntity<?> refreshToken(String refreshToken);

}
