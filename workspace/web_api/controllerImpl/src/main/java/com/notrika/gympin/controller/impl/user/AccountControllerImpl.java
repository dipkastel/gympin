package com.notrika.gympin.controller.impl.user;


import com.notrika.gympin.common.user.user.param.*;
import com.notrika.gympin.common.util.exception.ExceptionBase;
import com.notrika.gympin.common.user.user.api.AccountController;
import com.notrika.gympin.common.user.user.dto.UserDto;
import com.notrika.gympin.common.user.user.dto.UserInviteCodesDto;
import com.notrika.gympin.common.user.user.dto.UserRegisterDto;
import com.notrika.gympin.common.user.user.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/account")
public class AccountControllerImpl implements AccountController {

    @Autowired
    private AccountService accountService;

    @Override
    @PostMapping("/sendsms")
    public ResponseEntity<Boolean> sendSms(@RequestBody UserSendSmsParam phoneNumber) throws ExceptionBase {
        return new ResponseEntity<>(accountService.sendActivationSms(phoneNumber), HttpStatus.OK);
    }

//    @Override
//    @PostMapping("/register")
//    public ResponseEntity<UserRegisterDto> register(@RequestBody UserRegisterParam userRegisterParam) throws ExceptionBase {
//        return new ResponseEntity<>(accountService.register(userRegisterParam), HttpStatus.OK);
//    }

    @Override
    @PostMapping("/registerByInviteCode")
    public ResponseEntity<UserRegisterDto> registerByInviteCode(UserRegisterParam userRegisterParam) throws ExceptionBase {
        return new ResponseEntity<>(accountService.registerByInviteCode(userRegisterParam), HttpStatus.OK);
    }

    @Override
    @GetMapping("/getUserInviteCodes")
    public ResponseEntity<UserInviteCodesDto> getUserInviteCodes() throws ExceptionBase {
        return new ResponseEntity<>(accountService.getUserInviteCodes(), HttpStatus.OK);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginParam loginParam) throws ExceptionBase {
        return new ResponseEntity<>(accountService.loginUser(loginParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/requestRegisterPlace")
    public ResponseEntity<Boolean> RequestRegisterPlace(RequestRegisterParam param) {
        return ResponseEntity.ok(accountService.requestRegisterPlace(param));
    }

    @Override
    @PostMapping("/requestRegisterCorporate")
    public ResponseEntity<Boolean> RequestRegisterCorporate(RequestRegisterParam param) {
        return ResponseEntity.ok(accountService.requestRegisterCorporate(param));
    }

    @Override
    @PostMapping("/requestRegisterAdvise")
    public ResponseEntity<Boolean> RequestRegisterAdvice(RequestRegisterParam param) {
        return ResponseEntity.ok(accountService.requestRegisterAdvice(param));
    }

    @Override
    @PostMapping("/requestPublicMessage")
    public ResponseEntity<Boolean> RequestPublicMessage(RequestRegisterParam param) {
        return ResponseEntity.ok(accountService.requestPublicMessage(param));
    }

    @Override
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenParam refreshToken) {
        return new ResponseEntity<>(accountService.refreshToken(refreshToken), HttpStatus.OK);
    }

}
