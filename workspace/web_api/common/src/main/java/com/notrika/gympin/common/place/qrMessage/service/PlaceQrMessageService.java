package com.notrika.gympin.common.place.qrMessage.service;

import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.place.qrMessage.dto.PlaceQrMessageDto;
import com.notrika.gympin.common.place.qrMessage.param.PlaceQrMessageParam;

import java.util.List;

public interface PlaceQrMessageService extends BaseService<PlaceQrMessageParam, PlaceQrMessageDto, BaseQuery<?>> {

    List<PlaceQrMessageDto> getByPlaceId(Long placeId);
}
