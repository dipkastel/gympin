package com.notrika.gympin.common.finance.gateway.service;

import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.param.GatewaysParam;
import com.notrika.gympin.common.finance.gateway.query.GatewayQuery;
import com.notrika.gympin.common.util._base.base.BaseService;

public interface GatewayService extends BaseService<GatewaysParam, GatewaysDto, GatewayQuery> {

    GatewaysDto updateImage(GatewaysParam param) throws Exception;
}
