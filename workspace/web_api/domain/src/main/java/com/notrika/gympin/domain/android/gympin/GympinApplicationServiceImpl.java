package com.notrika.gympin.domain.android.gympin;

import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import com.notrika.gympin.common.android.master.service.GympinApplicationService;
import org.springframework.stereotype.Service;

@Service
public class GympinApplicationServiceImpl implements GympinApplicationService {
    @Override
    public SplashDto splash(SplashParam splashParam) {
        return new SplashDto();
    }
}
