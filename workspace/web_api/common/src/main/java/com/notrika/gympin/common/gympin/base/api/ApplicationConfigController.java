package com.notrika.gympin.common.gympin.base.api;

import com.notrika.gympin.common.gympin.base.dto.*;
import com.notrika.gympin.common.gympin.base.param.*;
import org.springframework.http.ResponseEntity;

public interface ApplicationConfigController {

    ResponseEntity<AndroidSplashDto> AndroidSplash(AndroidSplashParam splashParam);
    ResponseEntity<IosSplashDto> IosSplash(IosSplashParam splashParam);
    ResponseEntity<WebAppSplashDto> WebAppSplash(WebAppSplashParam splashParam);
    ResponseEntity<MasterSplashDto> MasterSplash(MasterSplashParam splashParam);
    ResponseEntity<CorporateSplashDto> CorporateSplash(CorporateSplashParam splashParam);
    ResponseEntity<AdminPanelSplashDto> AdminPanelSplash(AdminPanelSplashParam splashParam);


}
