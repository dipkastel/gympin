package com.notrika.gympin.controller.impl.communication.notification;

import com.notrika.gympin.common._base.query.BaseQuery;
import com.notrika.gympin.common._base.param.BasePagedParam;
import com.notrika.gympin.common.communication.notification.api.NotificationController;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;
import com.notrika.gympin.common.communication.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Notification")
public class NotificationControllerImpl implements NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET')")
    public ResponseEntity<NotificationDto> add(NotificationParam corporateParam) {
        return ResponseEntity.ok(notificationService.add(corporateParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public ResponseEntity<NotificationDto> update(NotificationParam corporateParam) {
        return ResponseEntity.ok(notificationService.update(corporateParam));
    }

    @Override
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public ResponseEntity<NotificationDto> delete(NotificationParam corporateParam) {
        return ResponseEntity.ok(notificationService.delete(corporateParam));
    }

    @Override
    public ResponseEntity<List<NotificationDto>> getAll(BasePagedParam pagingParam) {
        return ResponseEntity.ok(notificationService.getAll(pagingParam));
    }

    @Override
    public ResponseEntity<NotificationDto> getById(Long id) {
        return ResponseEntity.ok(notificationService.getById(id));
    }

    @Override
    @GetMapping("/getUserNotifications")
    public ResponseEntity<List<NotificationDto>> getUserNotifications(BasePagedParam pagedParam) {
        return ResponseEntity.ok(notificationService.getUserNotifications(pagedParam));
    }

    @Override
    public ResponseEntity<Page<NotificationDto>> query(BaseQuery<?> filter) {
        return null;
    }

}
