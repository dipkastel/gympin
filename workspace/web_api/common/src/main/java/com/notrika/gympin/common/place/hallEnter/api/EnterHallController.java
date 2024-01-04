package com.notrika.gympin.common.place.hallEnter.api;

import com.notrika.gympin.common.place.hallEnter.dto.EnterHallConfirmDto;
import com.notrika.gympin.common.place.hallEnter.dto.EnterHallRequestDto;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallConfirmParam;
import com.notrika.gympin.common.place.hallEnter.param.EnterHallRequestParam;
import org.springframework.http.ResponseEntity;

public interface EnterHallController {

    @Deprecated
    ResponseEntity<EnterHallConfirmDto> confirmEnterHall(EnterHallConfirmParam enterHallConfirmParam);

    @Deprecated
    ResponseEntity<EnterHallRequestDto> request(EnterHallRequestParam param);

}
