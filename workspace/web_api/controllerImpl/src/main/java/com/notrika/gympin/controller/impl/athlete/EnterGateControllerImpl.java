package com.notrika.gympin.controller.impl.athlete;

import com.notrika.gympin.common.athlete.gate.api.EnterGateController;
import com.notrika.gympin.common.athlete.gate.dto.EnterGateDto;
import com.notrika.gympin.common.athlete.gate.param.EnterGateParam;
import com.notrika.gympin.common.athlete.gate.service.EnterGateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "athleteEnterGateController")
//@Component(value="athleteEnterGateController")
@RequestMapping("/api/v1/athlete")
public class EnterGateControllerImpl implements EnterGateController {

    @Autowired
    private EnterGateService enterGateService;

    @Override
    @PostMapping("/request-enter")
    public ResponseEntity<EnterGateDto> request(@RequestBody EnterGateParam param) {
        return ResponseEntity.ok(enterGateService.request(param));
    }
}
