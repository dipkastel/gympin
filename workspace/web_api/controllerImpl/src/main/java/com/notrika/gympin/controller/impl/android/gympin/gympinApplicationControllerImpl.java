package com.notrika.gympin.controller.impl.android.gympin;

import com.notrika.gympin.common.android.gympin.api.GympinApplicationController;
import com.notrika.gympin.common.android.gympin.dto.MainPageItemDto;
import com.notrika.gympin.common.android.gympin.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.param.SplashParam;
import com.notrika.gympin.common.android.gympin.service.GympinApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/gympinapplication")
public class gympinApplicationControllerImpl implements GympinApplicationController {

    @Autowired
    private GympinApplicationService gympinApplicationService;

    @Override
    @PostMapping("/splash")
    public ResponseEntity<SplashDto> splash(SplashParam splashParam) {
        return new ResponseEntity<SplashDto>(gympinApplicationService.splash(splashParam), HttpStatus.OK);
    }

    @Override
    @PostMapping("/mainpage")
    public ResponseEntity<List<MainPageItemDto>> mainPage() {
        return new ResponseEntity<List<MainPageItemDto>>(gympinApplicationService.mainPage(), HttpStatus.OK);
    }
}
