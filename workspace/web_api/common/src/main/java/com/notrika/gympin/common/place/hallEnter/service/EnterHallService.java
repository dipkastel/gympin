package com.notrika.gympin.common.place.hallEnter.service;

import com.notrika.gympin.common.place.hallEnter.dto.EnterHallConfirmDto;
import com.notrika.gympin.common.place.hallEnter.dto.EnterHallRequestDto;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallConfirmParam;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallRequestParam;
import org.springframework.stereotype.Service;

@Service
public interface EnterHallService {


    @Deprecated
    EnterHallRequestDto request(EnterHallRequestParam param);

    @Deprecated
    EnterHallConfirmDto confirmEnterHall(EnterHallConfirmParam enterHallConfirmParam);

}
