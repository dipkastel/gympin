package com.notrika.gympin.common.finance.gateway.api;

import com.notrika.gympin.common.finance.gateway.param.GatewaysParam;
import com.notrika.gympin.common.finance.gateway.param.PersianGatewayCallbackParam;
import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.query.GatewayQuery;
import com.notrika.gympin.common.util._base.base.BaseController;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;

public interface GatewayController extends BaseController<GatewaysParam, GatewaysDto, GatewayQuery> {

    String PersianCallbackMethod(HttpServletRequest request, Model model, PersianGatewayCallbackParam param, String ref) throws Exception;
    ResponseEntity<GatewaysDto> updateImage(GatewaysParam param) throws Exception;
//    ResponseEntity<List<GatewaysDto>> getPaymentGateways(GatewaysParam param);

}
