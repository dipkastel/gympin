package com.notrika.gympin.service.impl.user;


import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.exception.PhoneNumberNotRegisterdException;
import com.notrika.gympin.common.user.api.UserController;
import com.notrika.gympin.common.user.dto.AdministratorLoginDto;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/user")
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Override
    @PostMapping("/sendsms")
    public ResponseEntity<Boolean> sendSms(@RequestBody String phoneNumber) throws PhoneNumberNotRegisterdException {
        return new ResponseEntity<>(userService.sendActivationSms(phoneNumber), HttpStatus.OK);
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase {
        return new ResponseEntity<>(userService.register(userRegisterParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/login")
    public ResponseEntity<UserDto> loginUser(Principal principal) throws ExceptionBase {
        return new ResponseEntity<>(userService.getUser(principal), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/loginpanel")
    public ResponseEntity<AdministratorLoginDto> loginPanel(Principal principal) throws ExceptionBase {
        return new ResponseEntity<>(userService.loginPanel(principal), HttpStatus.OK);
    }



}
