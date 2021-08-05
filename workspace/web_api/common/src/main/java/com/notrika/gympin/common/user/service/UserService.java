package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Principal;

public interface UserService extends UserDetailsService {

    UserRegisterDto register(UserRegisterParam userRegisterParam) throws ExceptionBase;

    UserDto getUser(Principal principal) throws ExceptionBase;

    String activeUserViaSms(String code);

    AdministratorLoginDto loginPanel(Principal principal) throws ExceptionBase;
}
