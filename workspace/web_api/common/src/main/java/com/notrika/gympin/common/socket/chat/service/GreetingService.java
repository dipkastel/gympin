package com.notrika.gympin.common.socket.chat.service;

import com.notrika.gympin.common.socket.chat.dto.GreetingDto;
import com.notrika.gympin.common.socket.chat.param.GreetingParam;

public interface GreetingService {
    GreetingDto greeting(String driverId, GreetingParam message);
}
