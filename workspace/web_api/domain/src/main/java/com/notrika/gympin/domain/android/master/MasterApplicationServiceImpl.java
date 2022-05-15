package com.notrika.gympin.domain.android.master;

import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import com.notrika.gympin.common.android.master.service.MasterApplicationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MasterApplicationServiceImpl implements MasterApplicationService {

    @Override
    public SplashDto splash(SplashParam splashParam) {
        log.info("SplashDto splash is going to execute with param {}",splashParam);
        return new SplashDto();
    }

}
