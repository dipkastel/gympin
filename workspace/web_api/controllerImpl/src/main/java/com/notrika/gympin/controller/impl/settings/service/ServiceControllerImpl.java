package com.notrika.gympin.controller.impl.settings.service;

import com.notrika.gympin.common.settings.service.api.ServiceController;
import com.notrika.gympin.common.settings.service.dto.ServiceDto;
import com.notrika.gympin.common.settings.service.param.ServiceByDateParam;
import com.notrika.gympin.common.settings.service.param.ServiceParam;
import com.notrika.gympin.common.settings.service.query.ServiceQuery;
import com.notrika.gympin.common.settings.service.service.ServiceService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/service")
public class ServiceControllerImpl implements ServiceController {

    @Autowired
    ServiceService serviceService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ServiceDto> add(ServiceParam serviceParam) {
        return ResponseEntity.ok(serviceService.add(serviceParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ServiceDto> update(ServiceParam ServiceParam) {
        return ResponseEntity.ok(serviceService.update(ServiceParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ServiceDto> delete(ServiceParam serviceParam) {
        return ResponseEntity.ok(serviceService.delete(serviceParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<ServiceDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(serviceService.getAll(pagingParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<ServiceDto> getById(Long id) {
        return ResponseEntity.ok(serviceService.getById(id));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<Page<ServiceDto>> query(ServiceQuery param) {
        return ResponseEntity.ok(serviceService.query(param));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    @PostMapping("/deleteCorruptedItems")
    public ResponseEntity<Boolean> deleteCorruptedItems() {
        return ResponseEntity.ok(serviceService.deleteCorruptedItems());
    }

    @Override
    @PostMapping("/getUsersActive")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN')")
    public ResponseEntity<List<ServiceDto>> getUsersActive(ServiceByDateParam param) {
        return ResponseEntity.ok(serviceService.getUsersActive(param));
    }
}
