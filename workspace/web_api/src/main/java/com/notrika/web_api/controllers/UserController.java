package com.notrika.web_api.controllers;

import com.notrika.web_api.data.Dto.User_send_sms_dto;
import com.notrika.web_api.data.Dto.User_Register_dto;
import com.notrika.web_api.data.Entity.Error;
import com.notrika.web_api.data.Entity.ResponseModel;
import com.notrika.web_api.data.Entity.User;
import com.notrika.web_api.data.converter.UserConvertor;
import com.notrika.web_api.data.services.UserService;
import com.notrika.web_api.jwt.JwtTokenProvider;
import com.notrika.web_api.services.sms.SmsManager;
import com.notrika.web_api.services.sms.SmsTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserConvertor userConvertor;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private SmsManager smsManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User_Register_dto dto) {

        try {
            User insertedUser = userService.saveUser(userConvertor.RegisterDtoToEntity(dto));
            return new ResponseEntity<>(new ResponseModel(userConvertor.EntityToDto(insertedUser)), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.REGISTER_USER_EXIST,e)), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel(new Error(Error.ErrorType.Exception,e)), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> getUser(Principal principal){
        if(principal == null){
            return ResponseEntity.ok(principal);
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) principal;
        User user = userService.findByUsername(authenticationToken.getName());
//        user.setToken(tokenProvider.generateToken(authenticationToken));
        String userToken = tokenProvider.generateToken(authenticationToken);

        return new ResponseEntity<>(new ResponseModel(userToken), HttpStatus.CREATED);
    }
    @PostMapping("/sendsms")
    public ResponseEntity sendsms(@RequestBody User_send_sms_dto dto) {
        smsManager.sendSms(dto.getPhoneNumber(), SmsTypes.CODE_TO_VERIFICATION,"1488");
        return new ResponseEntity<>(new ResponseModel(HttpStatus.OK), HttpStatus.OK);
    }

    @PostMapping("/activeuserviasms")
    public ResponseEntity<?> activeUserViaSms(@RequestBody String code) {
        return new ResponseEntity<>("nist", HttpStatus.NOT_FOUND);
    }


}
