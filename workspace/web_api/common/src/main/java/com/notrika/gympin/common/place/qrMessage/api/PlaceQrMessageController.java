package com.notrika.gympin.common.place.qrMessage.api;

import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceQrMessageController extends BaseController<PlaceQrMessageParam, PlaceQrMessageDto, BaseQuery<?>> {

    ResponseEntity<List<PlaceQrMessageDto>> getByPlace(PlaceGymParam placeParam);
}
