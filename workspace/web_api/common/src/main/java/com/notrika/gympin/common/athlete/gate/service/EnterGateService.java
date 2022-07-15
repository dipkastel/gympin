package com.notrika.gympin.common.athlete.gate.service;

import com.notrika.gympin.common.athlete.gate.dto.EnterGateDto;
import com.notrika.gympin.common.athlete.gate.param.EnterGateParam;

public interface EnterGateService {

    EnterGateDto request(EnterGateParam param);

}
