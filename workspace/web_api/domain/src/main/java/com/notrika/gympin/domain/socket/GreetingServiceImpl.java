package com.notrika.gympin.domain.socket;

import com.notrika.gympin.common.socket.chat.dto.GreetingDto;
import com.notrika.gympin.common.socket.chat.param.GreetingParam;
import com.notrika.gympin.common.socket.chat.service.GreetingService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Service;

@Service
public class GreetingServiceImpl implements GreetingService {


    @Override
    public GreetingDto greeting(@DestinationVariable String driverId, GreetingParam message) {
        return GreetingDto.builder().foo(message.getFoo()).bar(message.getBar()).baz(message.getBaz()).build();
    }
}
