package com.notrika.gympin.common.user.service;

import com.notrika.gympin.common.user.dto.UserCreditDto;
import com.notrika.gympin.common.user.param.PaymentParam;
import com.notrika.gympin.common.user.param.UserCreditIncreaseParam;
import com.notrika.gympin.common.user.param.UserParam;

public interface UserCreditService  {

    String increaseUserCredit(UserCreditIncreaseParam userCreditParam);
    Boolean checkPayment(PaymentParam paymentParam);
    UserCreditDto getCreditsByUser(UserParam userParam);
}
