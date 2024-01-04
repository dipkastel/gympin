package com.notrika.gympin.common.user.user.api;

import com.notrika.gympin.common.util.exception.ExceptionBase;
import com.notrika.gympin.common.user.user.dto.UserInviteCodesDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.user.param.RequestRegisterParam;
import com.notrika.gympin.common.user.user.param.LoginParam;
import com.notrika.gympin.common.user.user.param.RefreshTokenParam;
import com.notrika.gympin.common.user.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.user.param.UserSendSmsParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface AccountController {

    ResponseEntity<?> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase;

//    ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<UserRegisterDto> registerByInviteCode(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase;

    ResponseEntity<Boolean> RequestRegisterPlace(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestRegisterCorporate(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestRegisterAdvice(@RequestBody RequestRegisterParam place);

    ResponseEntity<Boolean> RequestPublicMessage(@RequestBody RequestRegisterParam place);

    ResponseEntity<UserInviteCodesDto> getUserInviteCodes() throws ExceptionBase;

    ResponseEntity<?> loginUser(LoginParam loginParam) throws ExceptionBase;

    ResponseEntity<?> refreshToken(RefreshTokenParam refreshToken);

}
