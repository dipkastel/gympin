package com.notrika.gympin.common.settings.service.service;

import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.common.settings.service.param.ServiceByDateParam;
import com.notrika.gympin.common.settings.service.param.ServiceParam;
import com.notrika.gympin.common.settings.service.query.ServiceQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

import java.util.List;

public interface ServiceService extends BaseService<ServiceParam, ServiceDto, ServiceQuery> {

    Boolean deleteCorruptedItems();
    List<ServiceDto> getUsersActive(ServiceByDateParam param);
    List<Long> getActiveUsersByCorporate(ServiceByDateParam param);

}
