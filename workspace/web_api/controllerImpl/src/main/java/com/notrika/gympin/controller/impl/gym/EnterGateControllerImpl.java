package com.notrika.gympin.controller.impl.gym;

import com.notrika.gympin.common.gym.gate.api.EnterGateController;
import com.notrika.gympin.common.gym.gate.dto.EnterGateDto;
import com.notrika.gympin.common.gym.gate.param.EnterGateParam;
import com.notrika.gympin.common.gym.gate.service.EnterGateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController(value = "gymEnterGateController")
//@Component(value="gymEnterGateController")
@RequestMapping("/api/v1/gym/")
public class EnterGateControllerImpl implements EnterGateController {

    @Autowired
    private EnterGateService enterGateService;

    @Override
    @PostMapping("/confirm-enter")
    public ResponseEntity<EnterGateDto> confirmEnterGate(@RequestBody EnterGateParam enterGateParam) {
        return ResponseEntity.ok(enterGateService.confirmEnterGate(enterGateParam));
    }
}
