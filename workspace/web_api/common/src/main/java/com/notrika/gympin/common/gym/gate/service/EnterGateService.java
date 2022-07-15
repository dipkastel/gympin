package com.notrika.gympin.common.gym.gate.service;

import com.notrika.gympin.common.gym.gate.dto.EnterGateDto;
import com.notrika.gympin.common.gym.gate.param.EnterGateParam;

public interface EnterGateService {

    EnterGateDto confirmEnterGate(EnterGateParam enterGateParam);

}
