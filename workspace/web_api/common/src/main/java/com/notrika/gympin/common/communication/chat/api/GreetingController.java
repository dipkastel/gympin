package com.notrika.gympin.common.communication.chat.api;

import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;

import java.security.Principal;

public interface GreetingController {

    GreetingDto greeting(Principal principal, String driverId, GreetingParam message);

}
