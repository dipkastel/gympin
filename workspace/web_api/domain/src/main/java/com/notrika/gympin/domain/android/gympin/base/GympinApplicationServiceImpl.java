package com.notrika.gympin.domain.android.gympin.base;

import com.notrika.gympin.common.android.gympin.base.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.base.param.SplashParam;
import com.notrika.gympin.common.android.gympin.base.service.GympinApplicationService;
import org.springframework.stereotype.Service;

@Service
public class GympinApplicationServiceImpl implements GympinApplicationService {
    @Override
    public SplashDto splash(SplashParam splashParam) {
        return new SplashDto();
    }

}
