package com.notrika.gympin.common.communication.chat.service;

import com.notrika.gympin.common.communication.chat.dto.GreetingDto;
import com.notrika.gympin.common.communication.chat.param.GreetingParam;

public interface GreetingService {
    GreetingDto greeting(String driverId, GreetingParam message);
}
