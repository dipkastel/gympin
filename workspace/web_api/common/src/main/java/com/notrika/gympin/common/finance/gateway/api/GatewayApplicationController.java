package com.notrika.gympin.common.finance.gateway.api;

import com.notrika.gympin.common.finance.gateway.dto.GatewayApplicationDto;
import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.param.GatewayApplicationParam;
import com.notrika.gympin.common.finance.gateway.param.GatewaysParam;
import com.notrika.gympin.common.finance.gateway.query.GatewayApplicationQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GatewayApplicationController extends BaseController<GatewayApplicationParam, GatewayApplicationDto, GatewayApplicationQuery> {

}
