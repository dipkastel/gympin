package com.notrika.gympin.common.communication.chat.api;

import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;
import org.springframework.messaging.handler.annotation.DestinationVariable;

public interface GreetingController {
    GreetingDto greeting(String driverId, GreetingParam message);
}
