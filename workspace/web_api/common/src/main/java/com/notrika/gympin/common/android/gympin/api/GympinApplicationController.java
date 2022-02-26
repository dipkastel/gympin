package com.notrika.gympin.common.android.gympin.api;

import com.notrika.gympin.common.android.gympin.dto.MainPageItemDto;
import com.notrika.gympin.common.android.gympin.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.param.SplashParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GympinApplicationController {

    ResponseEntity<SplashDto> splash(SplashParam splashParam);

    ResponseEntity<List<MainPageItemDto>> mainPage();
}
