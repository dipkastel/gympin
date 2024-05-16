package com.notrika.gympin.common.settings.service.api;

import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.common.settings.service.param.ServiceParam;
import com.notrika.gympin.common.settings.service.query.ServiceQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

public interface ServiceController extends BaseController<ServiceParam, ServiceDto, ServiceQuery> {

    ResponseEntity<Boolean> deleteCorruptedItems();
}
