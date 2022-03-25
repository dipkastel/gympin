package com.notrika.gympin.common.android.gympin.base.api;

import com.notrika.gympin.common.android.gympin.base.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.base.param.SplashParam;
import org.springframework.http.ResponseEntity;

public interface GympinApplicationController {

    ResponseEntity<SplashDto> splash(SplashParam splashParam);

}
