package com.notrika.gympin.controller.impl.user;

import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.user.api.UserCreditController;
import com.notrika.gympin.common.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.param.PaymentParam;
import com.notrika.gympin.common.user.param.UserCreditIncreaseParam;
import com.notrika.gympin.common.user.param.UserParam;
import com.notrika.gympin.common.user.service.UserCreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/userCredit")
public class UserCreditControllerImpl implements UserCreditController {

    @Autowired
    UserCreditService userCreditService;

    @PostMapping("increase")
    public ResponseEntity<String> increaseUserCredit(@RequestBody UserCreditIncreaseParam userCreditParam) {
        return ResponseEntity.ok(userCreditService.increaseUserCredit(userCreditParam));
    }

    @PostMapping("checkPayment")
    public ResponseEntity<Boolean> checkPayment(@RequestBody PaymentParam paymentParam) {
        return ResponseEntity.ok(userCreditService.checkPayment(paymentParam));
    }

    @GetMapping("getByUser")
    public ResponseEntity<UserCreditDto> getCreditsByUser(UserParam userParam) {
        return ResponseEntity.ok(userCreditService.getCreditsByUser(userParam));
    }


}
