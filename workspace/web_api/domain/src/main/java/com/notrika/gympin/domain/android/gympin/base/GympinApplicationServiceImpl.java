package com.notrika.gympin.domain.android.gympin.base;

import com.notrika.gympin.common.android.gympin.base.dto.SplashDto;
import com.notrika.gympin.common.android.gympin.base.param.SplashParam;
import com.notrika.gympin.common.android.gympin.base.service.GympinApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class GympinApplicationServiceImpl implements GympinApplicationService {

    @Override
    public SplashDto splash(SplashParam splashParam) {
        log.info("Splash is going to execute with params: {}",splashParam);
        return new SplashDto();
    }

}
