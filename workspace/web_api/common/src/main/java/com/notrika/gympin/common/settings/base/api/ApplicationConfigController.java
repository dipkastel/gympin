package com.notrika.gympin.common.settings.base.api;

import com.notrika.gympin.common.settings.base.dto.*;
import com.notrika.gympin.common.settings.base.param.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

public interface ApplicationConfigController {

    ResponseEntity<AndroidSplashDto> AndroidSplash(@RequestBody AndroidSplashParam splashParam);
    ResponseEntity<IosSplashDto> IosSplash(@RequestBody IosSplashParam splashParam);
    ResponseEntity<WebAppSplashDto> WebAppSplash(@RequestBody WebAppSplashParam splashParam);
    ResponseEntity<MasterSplashDto> MasterSplash(@RequestBody MasterSplashParam splashParam);
    ResponseEntity<CorporateSplashDto> CorporateSplash(@RequestBody CorporateSplashParam splashParam);
    ResponseEntity<AdminPanelSplashDto> AdminPanelSplash(@RequestBody AdminPanelSplashParam splashParam);


}
