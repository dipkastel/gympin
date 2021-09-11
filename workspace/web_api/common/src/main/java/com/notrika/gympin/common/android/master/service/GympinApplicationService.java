package com.notrika.gympin.common.android.master.service;

import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;

public interface MasterApplicationService {
    SplashDto splash(SplashParam splashParam);
}
