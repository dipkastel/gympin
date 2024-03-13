package com.notrika.gympin.controller.impl.finance.gateway;

import com.notrika.gympin.common.finance.gateway.api.GatewayController;
import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.param.GatewaysParam;
import com.notrika.gympin.common.finance.gateway.param.PersianGatewayCallbackParam;
import com.notrika.gympin.common.finance.gateway.query.GatewayQuery;
import com.notrika.gympin.common.finance.gateway.service.GatewayBankService;
import com.notrika.gympin.common.finance.gateway.service.GatewayService;
import com.notrika.gympin.common.finance.gateway.service.GeneralGatewayService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util.annotation.IgnoreWrapAspect;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/v1/Gateway")
public class GatewayControllerImpl implements GatewayController {

    @Autowired
    GeneralGatewayService generalGateways;

    @Autowired
    GatewayService gatewayService;

    @Autowired
    GatewayBankService gatewayBankService;


    @Override
    public ResponseEntity<GatewaysDto> add(GatewaysParam param) {
        return ResponseEntity.ok(gatewayService.add(param));
    }

    @Override
    public ResponseEntity<GatewaysDto> update(GatewaysParam param) {
        return ResponseEntity.ok(gatewayService.update(param));
    }

    @Override
    public ResponseEntity<GatewaysDto> delete(GatewaysParam param) {
        return ResponseEntity.ok(gatewayService.delete(param));
    }

    @Override
    public ResponseEntity<List<GatewaysDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(gatewayService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<GatewaysDto> getById(Long id) {
        return ResponseEntity.ok(gatewayService.getById(id));
    }

    @Override
    public ResponseEntity<Page<GatewaysDto>> query(GatewayQuery param) {
        return ResponseEntity.ok(gatewayService.query(param));
    }

    @Override
    @PostMapping("updateImage")
    public ResponseEntity<GatewaysDto> updateImage(@RequestBody GatewaysParam param) throws Exception {
        return ResponseEntity.ok(gatewayService.updateImage(param));
    }

    @Override
    @PostMapping(path = "/PersianCallbackMethod",consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @IgnoreWrapAspect
    public String PersianCallbackMethod(HttpServletRequest request, Model model, PersianGatewayCallbackParam param, String ref) throws Exception {
       return gatewayBankService.callback(request,model,param,ref);
    }



}
