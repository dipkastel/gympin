package com.notrika.gympin.common.communication.chat.api;

import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

public interface GreetingController {
//    GreetingDto greeting(String driverId, GreetingParam message);
GreetingDto greeting(Message messagea, MessageHeaders messageHeaders, SimpMessageHeaderAccessor accessor, java.security.Principal principal, String driverId, GreetingParam message);
}
