package com.notrika.gympin.controller.impl.user;


import com.notrika.gympin.common.exception.ExceptionBase;
import com.notrika.gympin.common.user.api.AccountController;
import com.notrika.gympin.common.user.dto.UserDto;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.param.LoginParam;
import com.notrika.gympin.common.user.param.RefreshTokenParam;
import com.notrika.gympin.common.user.param.UserRegisterParam;
import com.notrika.gympin.common.user.param.UserSendSmsParam;
import com.notrika.gympin.common.user.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/account")
public class AccountControllerImpl implements AccountController {

    @Autowired
    private AccountService accountService;

    @Override
    @PostMapping("/sendsms")
    //    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Boolean> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase {
        return new ResponseEntity<>(accountService.sendActivationSms(phoneNumber), HttpStatus.OK);
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase {
        return new ResponseEntity<>(accountService.register(userRegisterParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginParam loginParam) throws ExceptionBase {
        return new ResponseEntity<>(accountService.loginUser(loginParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/loginpPanel")
    public ResponseEntity<UserDto> loginPanel(@RequestBody LoginParam loginParam) throws ExceptionBase {
        return new ResponseEntity<>(accountService.loginPanel(loginParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenParam refreshToken) {
        return new ResponseEntity<>(accountService.refreshToken(refreshToken), HttpStatus.OK);
    }
}
