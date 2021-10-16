package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;

public interface AccountService extends UserDetailsService {

    boolean sendActivationSms(UserSendSmsParam phoneNumber) throws ExceptionBase;

    UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase;

    UserDto loginUser(Principal principal) throws ExceptionBase;

    AdministratorLoginDto loginPanel(LoginParam loginParam) throws ExceptionBase;
}
