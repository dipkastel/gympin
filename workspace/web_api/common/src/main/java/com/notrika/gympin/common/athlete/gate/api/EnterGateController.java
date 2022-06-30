package com.notrika.gympin.common.athlete.gate.api;

import com.notrika.gympin.common.athlete.gate.dto.EnterGateDto;
import com.notrika.gympin.common.athlete.gate.param.EnterGateParam;
import org.springframework.http.ResponseEntity;

public interface EnterGateController {

    ResponseEntity<EnterGateDto> request(EnterGateParam param);

}
