package com.notrika.gympin.controller.impl.settings.notification;

import com.notrika.gympin.common.settings.notification.api.NotificationController;
import com.notrika.gympin.common.settings.notification.dto.NotificationBasePayload;
import com.notrika.gympin.common.settings.notification.dto.NotificationDto;
import com.notrika.gympin.common.settings.notification.param.NotificationParam;
import com.notrika.gympin.common.settings.notification.query.NotificationQuery;
import com.notrika.gympin.common.settings.notification.service.NotificationService;
import com.notrika.gympin.common.util._base.param.BasePagedParam;
import com.notrika.gympin.common.util._base.query.BaseQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<Page<NotificationDto>> query(NotificationQuery query) {
        return null;
    }


    @Override
    @PostMapping("/sendNotificationToAll")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET')")
    public ResponseEntity<Integer> sendNotificationToAll(NotificationBasePayload data) throws Exception {
        return ResponseEntity.ok(notificationService.sendNotificationToAll(data).get());
    }

    @Override
    @PostMapping("/sendNotificationToApp")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'MARKET')")
    public ResponseEntity<Integer> sendNotificationToApp(NotificationBasePayload data) throws Exception {
        return ResponseEntity.ok(notificationService.sendNotificationToApplication(data).get());
    }

}
