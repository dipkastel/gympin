package com.notrika.gympin.common.gateway.parsian.api;

import com.notrika.gympin.common.gateway.parsian.param.GatewayCallbackParam;
import com.notrika.gympin.common.gym.gate.dto.EnterGateDto;
import com.notrika.gympin.common.gym.gate.param.EnterGateParam;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

public interface ParsianGatewayController {

    String CallbackMethod(HttpServletRequest request, Model model, GatewayCallbackParam param, String ref);

}
