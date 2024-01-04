package com.notrika.gympin.controller.impl.settings;

import com.notrika.gympin.common.settings.base.api.ApplicationConfigController;
import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.param.*;
import com.notrika.gympin.common.settings.base.service.ApplicationConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/configs")
public class ApplicationConfigControllerImpl implements ApplicationConfigController {

    @Autowired
    private ApplicationConfigService applicationConfigService;


    @Override
    @PostMapping("/AndroidSplash")
    public ResponseEntity<AndroidSplashDto> AndroidSplash(AndroidSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.AndroidSplash(splashParam));
    }

    @Override
    @PostMapping("/IosSplash")
    public ResponseEntity<IosSplashDto> IosSplash(IosSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.IosSplash(splashParam));
    }

    @Override
    @PostMapping("/WebAppSplash")
    public ResponseEntity<WebAppSplashDto> WebAppSplash(WebAppSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.WebAppSplash(splashParam));
    }

    @Override
    @PostMapping("/MasterSplash")
    public ResponseEntity<MasterSplashDto> MasterSplash(MasterSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.MasterSplash(splashParam));
    }

    @Override
    @PostMapping("/CorporateSplash")
    public ResponseEntity<CorporateSplashDto> CorporateSplash(CorporateSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.CorporateSplash(splashParam));
    }

    @Override
    @PostMapping("/AdminPanelSplash")
    public ResponseEntity<AdminPanelSplashDto> AdminPanelSplash(AdminPanelSplashParam splashParam) {
        return ResponseEntity.ok(applicationConfigService.AdminPanelSplash(splashParam));
    }
}
