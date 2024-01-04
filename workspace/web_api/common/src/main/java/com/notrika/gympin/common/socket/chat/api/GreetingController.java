package com.notrika.gympin.common.socket.chat.api;

import com.notrika.gympin.common.socket.chat.dto.GreetingDto;
import com.notrika.gympin.common.socket.chat.param.GreetingParam;

import java.security.Principal;

public interface GreetingController {

    GreetingDto greeting(Principal principal, String driverId, GreetingParam message);

}
