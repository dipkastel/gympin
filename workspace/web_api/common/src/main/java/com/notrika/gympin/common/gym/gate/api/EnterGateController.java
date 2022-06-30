package com.notrika.gympin.common.gym.gate.api;

import com.notrika.gympin.common.gym.gate.dto.EnterGateDto;
import com.notrika.gympin.common.gym.gate.param.EnterGateParam;
import org.springframework.http.ResponseEntity;

public interface EnterGateController {

    ResponseEntity<EnterGateDto> confirmEnterGate(EnterGateParam enterGateParam);

}
