package com.notrika.gympin.common.user.api;
import com.notrika.gympin.common.user.dto.UserRegisterDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

public interface UserController {

    ResponseEntity<?> register(@RequestBody UserRegisterDto dto);

    ResponseEntity<?> loginPanel(Principal principal);

    ResponseEntity<?> getUser(Principal principal);

    //ResponseEntity sendsms(@RequestBody User_send_sms_dto dto);

    ResponseEntity<?> activeUserViaSms(@RequestBody String code);

    String hello();

}
