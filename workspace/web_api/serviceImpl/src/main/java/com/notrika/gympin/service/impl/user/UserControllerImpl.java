package com.notrika.gympin.service.impl.user;


import com.notrika.gympin.common.user.api.UserController;
import com.notrika.gympin.common.user.service.UserService;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserControllerImpl implements UserController {

    @Autowired
    private UserService userService;

    @Override
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto dto) {
        return userService.register(dto);
    }

    @Override
    @GetMapping("/login")
    public ResponseEntity<?> getUser(@RequestBody Principal principal) {
        return userService.getUser(principal);
    }

    @Override
    @PostMapping("/activeuserviasms")
    public ResponseEntity<?> activeUserViaSms(@RequestBody String code) {
        return userService.activeUserViaSms(code);
    }

    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }


}
