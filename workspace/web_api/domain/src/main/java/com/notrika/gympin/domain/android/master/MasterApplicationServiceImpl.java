package com.notrika.gympin.domain.android.master;

import com.notrika.gympin.common.android.master.dto.SplashDto;
import com.notrika.gympin.common.android.master.param.SplashParam;
import com.notrika.gympin.common.android.master.service.MasterApplicationService;
import com.notrika.gympin.common.util.StringUtil;
import org.springframework.stereotype.Service;

@Service
public class MasterApplicationServiceImpl implements MasterApplicationService {
    @Override
    public SplashDto splash(SplashParam splashParam) {
        return new SplashDto();
    }
}
