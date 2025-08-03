package com.notrika.gympin.common.settings.service.api;

import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.common.settings.service.param.ServiceByDateParam;
import com.notrika.gympin.common.settings.service.param.ServiceParam;
import com.notrika.gympin.common.settings.service.query.ServiceQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ServiceController extends BaseController<ServiceParam, ServiceDto, ServiceQuery> {

    ResponseEntity<Boolean> deleteCorruptedItems();

    ResponseEntity<List<ServiceDto>> getUsersActive(@RequestBody ServiceByDateParam param);

    ResponseEntity<List<Long>> getActiveUsersByCorporate(@RequestBody ServiceByDateParam param);
}
