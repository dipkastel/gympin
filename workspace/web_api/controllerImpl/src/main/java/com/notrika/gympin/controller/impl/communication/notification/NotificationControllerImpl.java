package com.notrika.gympin.controller.impl.communication.notification;

import com.notrika.gympin.common.BaseFilter;
import com.notrika.gympin.common.BasePagedParam;
import com.notrika.gympin.common.communication.notification.api.NotificationController;
import com.notrika.gympin.common.communication.notification.dto.NotificationDto;
import com.notrika.gympin.common.communication.notification.param.NotificationParam;
import com.notrika.gympin.common.communication.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<NotificationDto> add(NotificationParam notificationParam) {
        return ResponseEntity.ok(notificationService.add(notificationParam));
    }

    @Override
    public ResponseEntity<NotificationDto> update(NotificationParam notificationParam) {
        return ResponseEntity.ok(notificationService.update(notificationParam));
    }

    @Override
    public ResponseEntity<NotificationDto> delete(NotificationParam notificationParam) {
        return ResponseEntity.ok(notificationService.delete(notificationParam));
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
    public ResponseEntity<List<NotificationDto>> getUserNotifications(BasePagedParam<?> pagedParam) {
        return ResponseEntity.ok(notificationService.getUserNotifications(pagedParam));
    }

    @Override
    public ResponseEntity<Long> countSearch(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<NotificationDto>> search(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<Long> countFilter(BaseFilter<?> filter) {
        return null;
    }

    @Override
    public ResponseEntity<List<NotificationDto>> filter(BaseFilter<?> filter) {
        return null;
    }
}
