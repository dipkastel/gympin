package com.notrika.gympin.common.android.master.api;

import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import org.springframework.http.ResponseEntity;

public interface MasterApplicationController {
    ResponseEntity<SplashDto> splash(SplashParam splashParam);
}
