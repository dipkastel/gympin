package com.notrika.gympin.common.support.api;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.support.dto.SupportMessageDto;
import com.notrika.gympin.common.support.query.SupportQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


public interface SupportController extends BaseController<SupportParam, SupportDto, SupportQuery> {
    ResponseEntity<SupportDto> addMessageToSupport(SupportMessageParam param) throws Exception;
    ResponseEntity<List<SupportDto>> getByUser(UserParam param);
    ResponseEntity<List<SupportDto>> getByPlace(PlaceGymParam param);
    ResponseEntity<List<SupportDto>> getByCorporate(CorporateParam param);
    ResponseEntity<Long> getCorporateSupportCount(CorporateParam param);
    ResponseEntity<Boolean> setMessagesRead(Long id);
    ResponseEntity<SupportMessageDto> updateMessage(@RequestBody SupportMessageParam param);
}
