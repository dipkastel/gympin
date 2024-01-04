package com.notrika.gympin.controller.impl.finance.gateway;

import com.notrika.gympin.common.finance.gateway.api.GatewayApplicationController;
import com.notrika.gympin.common.finance.gateway.dto.GatewayApplicationDto;
import com.notrika.gympin.common.finance.gateway.dto.GatewaysDto;
import com.notrika.gympin.common.finance.gateway.param.GatewayApplicationParam;
import com.notrika.gympin.common.finance.gateway.param.GatewaysParam;
import com.notrika.gympin.common.finance.gateway.query.GatewayApplicationQuery;
import com.notrika.gympin.common.finance.gateway.query.GatewayQuery;
import com.notrika.gympin.common.finance.gateway.service.GatewayApplicationService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/v1/GatewayApplication")
public class GatewayApplicationControllerImpl implements GatewayApplicationController {


    @Autowired
    GatewayApplicationService gatewayApplicationService;


    @Override
    public ResponseEntity<GatewayApplicationDto> add(GatewayApplicationParam param) {
        return ResponseEntity.ok(gatewayApplicationService.add(param));
    }

    @Override
    public ResponseEntity<GatewayApplicationDto> update(GatewayApplicationParam param) {
        return ResponseEntity.ok(gatewayApplicationService.update(param));
    }

    @Override
    public ResponseEntity<GatewayApplicationDto> delete(GatewayApplicationParam param) {
        return ResponseEntity.ok(gatewayApplicationService.delete(param));
    }

    @Override
    public ResponseEntity<List<GatewayApplicationDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(gatewayApplicationService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<GatewayApplicationDto> getById(Long id) {
        return ResponseEntity.ok(gatewayApplicationService.getById(id));
    }

    @Override
    public ResponseEntity<Page<GatewayApplicationDto>> query(GatewayApplicationQuery param) {
        return ResponseEntity.ok(gatewayApplicationService.query(param));
    }



}
