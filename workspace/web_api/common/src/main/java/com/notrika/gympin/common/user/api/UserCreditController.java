package com.notrika.gympin.common.user.api;

import com.notrika.gympin.common.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.param.PaymentParam;
import com.notrika.gympin.common.user.param.UserCreditIncreaseParam;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

public interface UserCreditController {

     ResponseEntity<String> increaseUserCredit(UserCreditIncreaseParam userCreditParam);
     ResponseEntity<UserCreditDto> getCreditsByUser(UserParam userParam);


}
