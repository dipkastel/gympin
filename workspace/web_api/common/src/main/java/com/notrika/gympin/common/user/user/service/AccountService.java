package com.notrika.gympin.common.user.user.service;

import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import com.notrika.gympin.common.user.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserInviteCodesDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {

    boolean sendActivationSms(UserSendSmsParam phoneNumber) throws ExceptionBase;

//    UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase;
    UserRegisterDto registerByInviteCode(UserRegisterParam userRegisterParam);

    UserDto loginUser(LoginParam loginParam) throws ExceptionBase;

    RefreshTokenDto refreshToken(RefreshTokenParam refreshToken);
    Boolean requestRegisterPlace(RequestRegisterParam param);
    Boolean requestRegisterCorporate(RequestRegisterParam param);
    Boolean requestRegisterAdvice(RequestRegisterParam param);
    Boolean requestPublicMessage(RequestRegisterParam param);

    UserInviteCodesDto getUserInviteCodes();
}
