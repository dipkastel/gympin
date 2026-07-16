package com.notrika.gympin.common.place.parts.qrMessage.api;

import com.notrika.gympin.common.place.placeGym.Gym.param.PlaceGymParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.parts.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.parts.qrMessage.param.PlaceQrMessageParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceQrMessageController extends BaseController<PlaceQrMessageParam, PlaceQrMessageDto, BaseQuery<?>> {

    ResponseEntity<List<PlaceQrMessageDto>> getByPlace(PlaceGymParam placeParam);
}
