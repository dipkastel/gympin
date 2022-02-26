package com.notrika.gympin.common.android.gympin.service;

import com.notrika.gympin.common.android.gympin.dto.MainPageItemDto;
import com.notrika.gympin.common.android.gympin.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.param.SplashParam;

import java.util.List;

public interface GympinApplicationService {
    SplashDto splash(SplashParam splashParam);
    List<MainPageItemDto> mainPage();
}
