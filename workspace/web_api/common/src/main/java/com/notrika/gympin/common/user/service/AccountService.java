package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.RefreshTokenDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.*;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends UserDetailsService {

    boolean sendActivationSms(UserSendSmsParam phoneNumber) throws ExceptionBase;

    UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase;

    UserDto loginUser(LoginParam loginParam) throws ExceptionBase;

    RefreshTokenDto refreshToken(RefreshTokenParam refreshToken);
    Boolean requestRegisterPlace(PlaceRequestRegisterParam param);

}
