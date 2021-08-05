package com.notrika.gympin.service.impl.user;


import com.notrika.gympin.common.exception.ExceptionBase;
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
    @PostMapping("/register")
    public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase {
        return new ResponseEntity<UserRegisterDto>(userService.register(userRegisterParam), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/loginpanel")
    public ResponseEntity<AdministratorLoginDto> loginPanel(Principal principal) throws ExceptionBase {
        return new ResponseEntity<>(userService.loginPanel(principal), HttpStatus.OK);
        //return userService.loginPanel(principal);
    }

    @Override
    @GetMapping("/login")
    public ResponseEntity<UserDto> getUser(Principal principal) throws ExceptionBase {
        return new ResponseEntity<UserDto>(userService.getUser(principal), HttpStatus.CREATED);
    }

    @Override
    @PostMapping("/activeuserviasms")
    public ResponseEntity<String> activeUserViaSms(@RequestBody String code) {
        return new ResponseEntity<String>(userService.activeUserViaSms(code), HttpStatus.NOT_FOUND);
    }


}
