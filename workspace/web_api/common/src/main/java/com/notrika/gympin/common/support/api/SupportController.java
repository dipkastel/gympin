package com.notrika.gympin.common.support.api;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface SupportController extends BaseController<SupportParam, SupportDto, BaseQuery<?>> {
    ResponseEntity<SupportDto> addMessageToSupport(SupportMessageParam param) throws Exception;
    ResponseEntity<List<SupportDto>> getByUser(UserParam param);
    ResponseEntity<List<SupportDto>> getByPlace(PlaceParam param);
    ResponseEntity<List<SupportDto>> getByCorporate(CorporateParam param);
}
