package com.notrika.gympin.controller.impl.android.master;

import com.notrika.gympin.common.android.master.api.MasterApplicationController;
import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import com.notrika.gympin.common.android.master.service.MasterApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/masterapplication")
public class MasterApplicationControllerImpl implements MasterApplicationController {

    @Autowired
    private MasterApplicationService masterApplicationService;

    @Override
    @PostMapping("/splash")
    public ResponseEntity<SplashDto> splash(SplashParam splashParam) {
        return ResponseEntity.ok(masterApplicationService.splash(splashParam));
    }
}
