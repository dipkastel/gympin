package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.UserInviteCodesDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.RequestRegisterParam;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.RefreshTokenParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface AccountController {

    ResponseEntity<?> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase;

    ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<UserRegisterDto> registerByInviteCode(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<Boolean> RequestRegisterPlace(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestRegisterCorporate(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestRegisterAdvice(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestPublicMessage(@RequestBody RequestRegisterParam place);

    ResponseEntity<UserInviteCodesDto> registerByInviteCode() throws ExceptionBase;

    ResponseEntity<?> loginUser(LoginParam loginParam) throws ExceptionBase;

    ResponseEntity<?> refreshToken(RefreshTokenParam refreshToken);

}
