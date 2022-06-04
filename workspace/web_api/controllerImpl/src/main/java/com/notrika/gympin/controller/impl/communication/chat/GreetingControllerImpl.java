package com.notrika.gympin.controller.impl.communication.chat;

import com.notrika.gympin.common.annotation.IgnoreWrapAspect;
import com.notrika.gympin.common.communication.chat.api.GreetingController;
import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;
import com.notrika.gympin.common.communication.chat.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/greeting")
public class GreetingControllerImpl implements GreetingController {

    @Autowired
    private GreetingService greetingService;

    @MessageMapping("/hello/{driverId}")
    @SendTo("/chat/{driverId}/greetings")
    @IgnoreWrapAspect
    @Override
    public GreetingDto greeting(Message messagea, MessageHeaders messageHeaders, SimpMessageHeaderAccessor accessor, java.security.Principal principal, String driverId, GreetingParam message) {
                return GreetingDto.builder().foo(message.getFoo()).bar(message.getBar()).baz(message.getBaz()).build();
            }
//    public GreetingDto greeting(String driverId, GreetingParam message) {
//        return GreetingDto.builder().foo(message.getFoo()).bar(message.getBar()).baz(message.getBaz()).build();
//    }
}
