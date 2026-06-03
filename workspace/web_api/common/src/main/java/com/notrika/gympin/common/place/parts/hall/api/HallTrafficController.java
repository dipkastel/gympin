package com.notrika.gympin.common.place.parts.hall.api;

import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.parts.hall.dto.HallTrafficDto;
import com.notrika.gympin.common.place.parts.hall.param.HallParam;
import com.notrika.gympin.common.place.parts.hall.param.HallTrafficParam;
import org.springframework.http.ResponseEntity;

public interface HallTrafficController extends BaseController<HallTrafficParam, HallTrafficDto, BaseQuery<?>> {


    ResponseEntity<HallTrafficDto> getLatestTraficByHall(HallParam hallParam);

}
