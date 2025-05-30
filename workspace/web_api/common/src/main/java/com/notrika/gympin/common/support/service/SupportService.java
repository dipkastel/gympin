package com.notrika.gympin.common.support.service;

import com.notrika.gympin.common.corporate.corporate.param.CorporateParam;
import com.notrika.gympin.common.place.placeGym.param.PlaceGymParam;
import com.notrika.gympin.common.support.query.SupportQuery;
import com.notrika.gympin.common.util._base.base.BaseService;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.user.user.param.UserParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SupportService extends BaseService<SupportParam, SupportDto, SupportQuery> {

    SupportDto addMessageToSupport(@RequestBody SupportMessageParam param) throws Exception;
    List<SupportDto> getByUser(UserParam param);
    List<SupportDto> getByPlace(PlaceGymParam param);
    List<SupportDto> getByCorporate(CorporateParam param);
    Long getCorporateSupportCount(CorporateParam param);
    Boolean setMessagesReadById(Long id);

}
