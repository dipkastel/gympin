package com.notrika.gympin.common.support.service;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.base.BaseService;
import com.notrika.gympin.common.place.place.param.PlaceParam;
import com.notrika.gympin.common.support.dto.SupportDto;
import com.notrika.gympin.common.support.param.SupportMessageParam;
import com.notrika.gympin.common.support.param.SupportParam;
import com.notrika.gympin.common.user.param.UserParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface SupportService extends BaseService<SupportParam, SupportDto, BaseQuery<?>> {

    SupportDto addMessageToSupport(@RequestBody SupportMessageParam param);
    List<SupportDto> getByUser(UserParam param);
    List<SupportDto> getByPlace(PlaceParam param);

}
