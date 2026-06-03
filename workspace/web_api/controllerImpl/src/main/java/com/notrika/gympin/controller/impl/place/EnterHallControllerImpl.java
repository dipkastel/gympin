package com.notrika.gympin.controller.impl.place;

import com.notrika.gympin.common.place.parts.hallEnter.api.EnterHallController;
import com.notrika.gympin.common.place.parts.hallEnter.dto.EnterHallConfirmDto;
import com.notrika.gympin.common.place.parts.hallEnter.dto.EnterHallRequestDto;
import com.notrika.gympin.common.place.parts.hallEnter.param.EnterHallConfirmParam;
import com.notrika.gympin.common.place.parts.hallEnter.param.EnterHallRequestParam;
import com.notrika.gympin.common.place.parts.hallEnter.service.EnterHallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController(value = "gymEnterHallController")
@RequestMapping("/api/v1/HallEnter/")
public class EnterHallControllerImpl implements EnterHallController {

    @Autowired
    private EnterHallService enterHallService;

    @Override
    @PostMapping("/confirmEnter")
    @Deprecated
    public ResponseEntity<EnterHallConfirmDto> confirmEnterHall(@RequestBody EnterHallConfirmParam enterHallConfirmParam) {
        return ResponseEntity.ok(enterHallService.confirmEnterHall(enterHallConfirmParam));
    }

    @Override
    @PostMapping("/requestEnter")
    @Deprecated
    public ResponseEntity<EnterHallRequestDto> request(@RequestBody EnterHallRequestParam param) {
        return ResponseEntity.ok(enterHallService.request(param));
    }
}
