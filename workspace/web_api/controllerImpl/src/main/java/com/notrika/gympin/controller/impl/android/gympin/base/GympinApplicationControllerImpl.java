package com.notrika.gympin.controller.impl.android.gympin.base;

import com.notrika.gympin.common.android.gympin.base.api.GympinApplicationController;
import com.notrika.gympin.common.android.gympin.base.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.base.param.SplashParam;
import com.notrika.gympin.common.android.gympin.base.service.GympinApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/gympinapplication")
public class GympinApplicationControllerImpl implements GympinApplicationController {

    @Autowired
    private GympinApplicationService gympinApplicationService;

    @Override
    @PostMapping("/splash")
    public ResponseEntity<SplashDto> splash(SplashParam splashParam) {
        return ResponseEntity.ok(gympinApplicationService.splash(splashParam));
    }

}
