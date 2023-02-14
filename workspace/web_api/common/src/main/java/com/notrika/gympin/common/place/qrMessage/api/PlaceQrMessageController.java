package com.notrika.gympin.common.place.qrMessage.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PlaceQrMessageController extends BaseController<PlaceQrMessageParam, PlaceQrMessageDto, BaseQuery<?>> {

    ResponseEntity<List<PlaceQrMessageDto>> getByPlace(PlaceParam placeParam);
}
