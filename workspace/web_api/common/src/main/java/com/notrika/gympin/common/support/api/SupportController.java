package com.notrika.gympin.common.support.api;

import com.notrika.gympin.common._base.base.BaseController;
import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface SupportController extends BaseController<SupportParam, SupportDto, BaseQuery<?>> {
    ResponseEntity<SupportDto> addMessageToSupport(SupportMessageParam param);
    ResponseEntity<List<SupportDto>> getByUser(UserParam param);
    ResponseEntity<List<SupportDto>> getByPlace(PlaceParam param);
}
