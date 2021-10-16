package com.notrika.gympin.controller.impl.user;


import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.api.AccountController;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/account")
public class AccountControllerImpl implements AccountController {

    @Autowired
    private AccountService userService;

    @Override
    @PostMapping("/sendsms")
    public ResponseEntity<Boolean> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase {
        return new ResponseEntity<>(userService.sendActivationSms(phoneNumber), HttpStatus.OK);
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase {
        return new ResponseEntity<>(userService.register(userRegisterParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(Principal principal) throws ExceptionBase {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        return new ResponseEntity<>(userService.loginUser(principal), HttpStatus.OK);
    }

    @Override
    @PostMapping("/loginpanel")
    public ResponseEntity<AdministratorLoginDto> loginPanel(LoginParam loginParam) throws ExceptionBase {
        return new ResponseEntity<>(userService.loginPanel(loginParam), HttpStatus.OK);
    }


}
