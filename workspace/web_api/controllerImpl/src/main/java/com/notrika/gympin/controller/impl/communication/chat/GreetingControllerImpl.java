package com.notrika.gympin.controller.impl.communication.chat;

import com.notrika.gympin.common.communication.chat.api.GreetingController;
import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;
import com.notrika.gympin.common.communication.chat.service.GreetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingControllerImpl implements GreetingController {

    @Autowired
    private GreetingService greetingService;

    @Override
    public GreetingDto greeting(String driverId, GreetingParam message) {
        return greetingService.greeting(driverId, message);
    }
}
