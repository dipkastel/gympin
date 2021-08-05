package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

public interface UserController {

    ResponseEntity<?> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<?> loginPanel(Principal principal) throws ExceptionBase;

    ResponseEntity<?> getUser(Principal principal) throws ExceptionBase;

    //ResponseEntity sendsms(@RequestBody User_send_sms_dto dto);

    ResponseEntity<?> activeUserViaSms(@RequestBody String code);

}
