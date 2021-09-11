package com.notrika.gympin.controller.impl.android.gympin;

import com.notrika.gympin.common.android.master.api.MasterApplicationController;
import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import com.notrika.gympin.common.android.master.service.GympinApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/gympinapplication")
public class gympinApplicationControllerImpl implements MasterApplicationController {

    @Autowired
    private GympinApplicationService gympinApplicationService;

    @Override
    @PostMapping("/splash")
    public ResponseEntity<SplashDto> splash(SplashParam splashParam) {
        return new ResponseEntity<SplashDto>(gympinApplicationService.splash(splashParam), HttpStatus.OK);
    }
}
