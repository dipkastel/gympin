package com.notrika.gympin.domain.communication.chat;

import com.notrika.gympin.common.communication.chat.api.GreetingController;
import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;
import com.notrika.gympin.common.communication.chat.service.GreetingService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

@Service
public class GreetingServiceImpl implements GreetingService {

    @MessageMapping("/hello/{driverId}")
    @SendTo("/chat/{driverId}/greetings")
    @Override
    public GreetingDto greeting(@DestinationVariable String driverId, GreetingParam message) {
        return GreetingDto.builder().foo(message.getFoo()).bar(message.getBar()).baz(message.getBaz()).build();
    }
}
